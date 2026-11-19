/* ============================================================
   UNLOCK MAGIC — lógica del truco
   Edita los valores de CONFIG para ajustar el comportamiento
   sin tocar el resto del código.
   ============================================================ */
const CONFIG = {
  failedAttempts: 1,     // nº de intentos "fallidos" antes de que se desbloquee
  shakeDuration: 450,    // ms de la animación de PIN incorrecto
  flashDuration: 550,    // ms del destello blanco de desbloqueo
  defaultPage: 1,        // página que se muestra al desbloquear (0=izq, 1=centro, 2=der)
  vibrateOnKey: true,    // vibración táctil al pulsar cada tecla (si el navegador lo soporta)
};

const UnlockMagic = (() => {

  // ---------- Reloj y batería reales ----------
  function pad(n){ return n < 10 ? '0' + n : n; }

  function tickClock(){
    const d = new Date();
    document.getElementById('sbtime').textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function initBattery(){
    const el = document.getElementById('sbbatt');
    if (navigator.getBattery){
      navigator.getBattery().then(batt => {
        const update = () => el.textContent = Math.round(batt.level * 100);
        update();
        batt.addEventListener('levelchange', update);
      }).catch(() => {});
    }
  }

  // ---------- Fecha real en el widget de Calendario ----------
  function initCalendar(){
    const dias = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
    const meses = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const d = new Date();
    document.getElementById('calDow').textContent = dias[d.getDay()] + ' ' + meses[d.getMonth()];
    document.getElementById('calNum').textContent = d.getDate();
  }

  // ---------- Teclado numérico ----------
  const LAYOUT = [
    ['1',''],['2','ABC'],['3','DEF'],
    ['4','GHI'],['5','JKL'],['6','MNO'],
    ['7','PQRS'],['8','TUV'],['9','WXYZ'],
    ['',''],['0',''],['','']
  ];

  let stage = 0;   // 0 = intentos fallidos restantes, luego pasa a desbloqueo
  let failsLeft = CONFIG.failedAttempts;
  let count = 0;
  let dotsEl, dots;

  function buildKeypad(){
    const keypad = document.getElementById('keypad');
    LAYOUT.forEach(([num, letters]) => {
      const k = document.createElement('div');
      k.classList.add('key');
      if (num === ''){
        k.style.visibility = 'hidden';
      } else {
        k.innerHTML = num + (letters ? `<span class="letters">${letters}</span>` : '');
        k.addEventListener('pointerdown', () => k.classList.add('pressed'));
        k.addEventListener('pointerup', () => k.classList.remove('pressed'));
        k.addEventListener('pointerleave', () => k.classList.remove('pressed'));
        k.addEventListener('click', pressDigit);
      }
      keypad.appendChild(k);
    });
  }

  function pressDigit(){
    if (count >= 4) return;
    if (CONFIG.vibrateOnKey && navigator.vibrate) navigator.vibrate(8);
    dots[count].classList.add('filled');
    count++;
    if (count === 4){
      setTimeout(() => {
        if (failsLeft > 0){
          failsLeft--;
          dotsEl.classList.add('shake');
          if (navigator.vibrate) navigator.vibrate([40,60,40]);
          setTimeout(() => {
            dotsEl.classList.remove('shake');
            dots.forEach(d => d.classList.remove('filled'));
            count = 0;
          }, CONFIG.shakeDuration);
        } else {
          unlock();
        }
      }, 180);
    }
  }

  function unlock(){
    document.getElementById('flash').classList.add('go');
    document.getElementById('lock').classList.add('hide');
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => {
      document.getElementById('home').classList.add('show');
    }, 300);
  }

  // ---------- Paginación de la home screen ----------
  function initPager(){
    const pager = document.getElementById('pager');
    const pageDots = document.querySelectorAll('#pagedots i');

    pager.addEventListener('scroll', () => {
      const idx = Math.round(pager.scrollLeft / pager.clientWidth);
      pageDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });

    window.addEventListener('load', () => {
      pager.scrollLeft = pager.clientWidth * CONFIG.defaultPage;
    });
    window.addEventListener('resize', () => {
      pager.scrollLeft = pager.clientWidth * CONFIG.defaultPage;
    });
  }

  // ---------- Iconos del home: feedback táctil real al tocar ----------
  function initIcons(){
    document.querySelectorAll('.icon').forEach(icon => {
      const app = icon.closest('.app');
      icon.addEventListener('pointerdown', () => icon.classList.add('pressed'));
      icon.addEventListener('pointerup', () => icon.classList.remove('pressed'));
      icon.addEventListener('pointerleave', () => icon.classList.remove('pressed'));
      icon.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(10);
        if (app){
          app.classList.remove('bouncing');
          void app.offsetWidth; // reinicia la animación si se toca varias veces
          app.classList.add('bouncing');
        }
      });
    });
    // SOS / Cancelar en la pantalla de bloqueo
    document.querySelectorAll('.lockfooter span').forEach(btn => {
      btn.addEventListener('pointerdown', () => btn.classList.add('pressed'));
      btn.addEventListener('pointerup', () => btn.classList.remove('pressed'));
      btn.addEventListener('pointerleave', () => btn.classList.remove('pressed'));
      btn.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(10);
        if (btn.textContent.trim() === 'Cancelar'){
          dots.forEach(d => d.classList.remove('filled'));
          count = 0;
        }
      });
    });
  }

  // ---------- Pantalla completa (oculta la barra del navegador) ----------
  let fullscreenRequested = false;
  function requestFullscreenOnce(){
    if (fullscreenRequested) return;
    fullscreenRequested = true;
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) req.call(el).catch(() => {});
  }

  function init(){
    dotsEl = document.getElementById('dots');
    dots = dotsEl.querySelectorAll('.dot');
    tickClock();
    setInterval(tickClock, 10000);
    initBattery();
    initCalendar();
    buildKeypad();
    initPager();
    initIcons();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { requestFullscreenOnce };
})();
