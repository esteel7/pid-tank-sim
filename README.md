# Simulador PID de Tanque (Web)

Proyecto base, modular y extensible para simulaciones de control en el navegador.

## Modelo

- Planta: `dh/dt = (Kb·i - h/R)/A` con `q_out = h/R` e `i` saturada en `[iMin, iMax]`.
- Control: PID con anti-windup por clamping.
- Modos: Manual (corriente a la bomba) y Automático (PID).

## Estructura
```
src/
  core/         # lógica independiente de UI (reutilizable)
  components/   # UI react (tanque, charts, panel)
  hooks/        # orquestación/loop de simulación
  App.tsx       # composición de la página
```

## Requerimientos
- Node.js 18+

## Desarrollo
```bash
# 1) Crear proyecto (si partes desde cero)
npm create vite@latest pid-tank-sim -- --template react-ts
cd pid-tank-sim

# 2) Reemplaza/añade los archivos con los de este repo
# 3) Instalar dependencias
npm install

# 4) Ejecutar en modo dev
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages
1. Asegura que `vite.config.ts` tenga `base: "/<nombre-repo>/"`.
2. Activa GitHub Pages en **Settings → Pages → Deploy from a branch** y selecciona **gh-pages** al menos una vez, o usa el script:
```bash
npm run build
npm run deploy  # publica /dist a una rama gh-pages
```
3. Sube el proyecto al repositorio y verifica la URL `https://<tu-usuario>.github.io/<nombre-repo>/`.

## Reutilización para otras plantas
- Implementa tu nueva dinámica en `src/core/plant_X.ts` exportando una clase con `deriv()` y `step()`.
- Mantén `Simulator` tal cual (o extiéndelo) y cambia únicamente dónde creas la `plant` en `useSimulation()`.
- Las gráficas y el panel funcionan con cualquier planta que exponga `h` (o adapta los nombres creando más series).

## Licencia
MIT.

## Autodespliegue con GitHub Actions
Con el workflow `.github/workflows/deploy.yml`, cada **push a `main`** construye automáticamente el sitio y publica `dist/` en la rama `gh-pages`.

### Pasos (primera vez)
1. Sube el archivo del workflow y haz `push` a `main`.
2. En **Settings → Pages** selecciona **Deploy from a branch** y la rama **gh-pages** (carpeta `/`).
3. Verifica la URL: `https://<tu-usuario>.github.io/<nombre-repo>/`.

> Asegúrate de que `vite.config.ts` tenga `base: "/<nombre-repo>/"`.
