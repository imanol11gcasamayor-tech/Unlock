# 🔓 Unlock Magic

Pantalla de bloqueo falsa para el truco de magia "Unlock Magic". Simula el lockscreen y el home screen de un iPhone y "se desbloquea mágicamente" cuando el espectador introduce un segundo código de 4 dígitos.

## Cómo funciona el truco

1. Abres la página en tu móvil, a pantalla completa.
2. Le pides al espectador que pruebe a meter su código de 4 dígitos. Falla (los puntos tiemblan), como un PIN incorrecto normal.
3. Le dices que piense en otro número y que lo vaya diciendo dígito a dígito mientras lo tecleas.
4. Al cuarto dígito, la pantalla se "desbloquea" con una animación realista y pasa al home screen falso, con 3 páginas deslizables igual que un iPhone real.

> Esta versión **no guarda ni muestra en ningún sitio** el código que introduce el espectador. El efecto depende de tu puesta en escena como mago (por ejemplo, el propio espectador dicta el segundo número en voz alta), no de que la app "sepa" nada.

## Archivos

```
unlock-magic/
├── index.html   → estructura de la pantalla de bloqueo y del home
├── style.css    → todo el estilo visual (iOS look & feel)
├── script.js    → lógica del truco (reloj real, teclado, desbloqueo, swipe)
└── assets/
    └── background.jpg
```

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube estos 4 archivos/carpeta tal cual.
2. Ve a **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. En unos minutos tendrás una URL tipo `https://tu-usuario.github.io/unlock-magic/`.
4. Ábrela en el móvil, dale a "Añadir a pantalla de inicio" para que arranque sin barra de navegador (o toca la pantalla una vez: la app pide pantalla completa automáticamente).

## Personalizarlo

Todo lo que normalmente querrías tocar está centralizado al principio de `script.js`, en el objeto `CONFIG`:

```js
const CONFIG = {
  failedAttempts: 1,     // nº de intentos "fallidos" antes de desbloquear
  shakeDuration: 450,    // duración de la animación de PIN incorrecto
  flashDuration: 550,    // duración del destello de desbloqueo
  defaultPage: 1,        // página del home que se muestra al desbloquear
  vibrateOnKey: true,    // vibración al pulsar cada tecla
};
```

Para cambiar el fondo, sustituye `assets/background.jpg` por tu propia foto (misma resolución recomendada, ~480px de ancho para que cargue rápido). Para cambiar los iconos o apps del home, edita los bloques `.app` dentro de `index.html`.

## Mejoras incluidas en esta versión

- Reloj y batería reales (usa la hora del dispositivo y, si el navegador lo permite, el nivel de batería real).
- Fecha real en el widget de Calendario (cambia cada día automáticamente).
- Vibración táctil al pulsar las teclas y al desbloquear (en móviles compatibles).
- Pantalla completa automática al primer toque, para ocultar la barra del navegador.
- Código separado en HTML/CSS/JS para poder editarlo y mantenerlo fácilmente en GitHub.
