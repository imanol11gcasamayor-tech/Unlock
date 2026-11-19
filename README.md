# Unlock Magic (casero)

Pantalla de bloqueo falsa de iPhone para un efecto de magia.

1. El espectador teclea 4 dígitos → *error* (el iPhone no se desbloquea) y **el código se guarda**.
2. Teclea otro código cualquiera → se "desbloquea" y aparece la pantalla de inicio.
3. En esa pantalla, los 4 dígitos del primer código están escondidos en los nombres de 4 apps
   (por defecto: Música, Fotos, Mail, Notas; léelos en ese orden).

Todo funciona en el navegador y **no se envía nada a ningún servidor**: el código solo vive en memoria
mientras la página está abierta.

## Uso
- Abre la URL de GitHub Pages en Safari → Compartir → **Añadir a pantalla de inicio**
  (así se abre a pantalla completa, sin barra de Safari).
- **Reiniciar el efecto:** 3 toques rápidos sobre la hora (arriba a la izquierda).

## Personalizar
En `index.html`, bloque `CONFIGURACIÓN`:
- `DIGIT_LABELS`: qué apps llevan cada dígito y en qué orden.
- `FORMAT`: cómo se escribe el dígito (`Mail 3`, `Mail·3`, …).

## Cambiar las capturas
Sustituye `img/lock.jpg` (bloqueo) e `img/home.jpg` (inicio). Deben ser capturas de 1179×2556;
si usas otras medidas o apps distintas, ajusta las coordenadas en `index.html`.
