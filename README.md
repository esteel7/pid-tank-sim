# Simulador PID de Tanque (Web)

Simulador interactivo de nivel en un estanque con **bomba** (caudal de entrada), **válvula de descarga** y **controlador PID**. Funciona 100% en el navegador (React + TypeScript + Vite). Ideal para docencia de control de procesos: modo manual (corriente de bomba) y modo automático (PID), gráficas en tiempo real y exportación CSV.

**Demo (GitHub Pages):** https://esteel7.github.io/pid-tank-sim/

---

## Características

- Diagrama animado del **tanque** (nivel sube/baja) y estado **BOMBA ON/OFF**
- **Dos modos de operación**:
  - Manual: slider de **corriente** a la bomba
  - Automático (PID): entradas para **Kp, Ki, Kd** y **setpoint**
- Gráficas en tiempo real:
  - **Señal de control** (corriente i(t))
  - **Variable de proceso** (nivel h(t)) + setpoint
- **Exportar CSV** (tiempo, corriente, nivel, etc.)
- Arquitectura **modular**: lógica en `src/core/`, UI en `src/components/`, loop en `src/hooks/`

---

## Modelo

**Dinámica del nivel** (tanque de área \(A\), válvula de descarga con constante \(R\), bomba con constante \(K_b\)):

\[
\frac{dh}{dt} = \frac{q_{\text{in}} - q_{\text{out}}}{A},\qquad
q_{\text{in}} = K_b \, i,\qquad
q_{\text{out}} = \frac{h}{R}
\]

donde:
- \(h\) = nivel del líquido [m]  
- \(i\) = corriente de la bomba [A] (con **saturación** \(i \in [i_{\min},\, i_{\max}]\))

**Controlador PID** (con anti-*windup* por *clamping*):

\[
u(t) = K_p\, e(t) + K_i \!\int e(t)\, dt + K_d\, \frac{de(t)}{dt},
\qquad e(t) = \text{SP} - h(t)
\]

En modo **PID**, la corriente aplicada es \(i(t) = \text{sat}(u(t))\).  
La simulación es discreta con paso \(\Delta t\) y **Euler** semi-implícito para la planta.

---

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
