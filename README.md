# Simulador PID de Tanque (Web)

Simulador interactivo de nivel en un estanque con **bomba** (caudal de entrada), **válvula de descarga** y **controlador PID**.  
Funciona completamente en el navegador (React + TypeScript + Vite).  
Ideal para docencia en **Control de Procesos** o **Automatización Industrial**, con modos manual y automático, visualización en tiempo real y exportación de datos.

**Demo (GitHub Pages):**  
👉 <https://esteel7.github.io/pid-tank-sim/>

---

## Características

- Diagrama animado del **tanque** (nivel sube y baja).
- **Dos modos de operación:**
  - **Manual:** el estudiante controla la corriente de la bomba mediante un *slider*.
  - **PID automático:** el sistema ajusta la corriente para alcanzar el *setpoint*.
- **Gráficas dinámicas:**
  - Señal de control: corriente i(t)
  - Variable de proceso: nivel h(t) con setpoint
- **Exportación CSV:** descarga de registros (tiempo, corriente, nivel, error).
- Arquitectura **modular y reutilizable** para implementar otras plantas.

---

## Modelo

### Dinámica del tanque

$$\frac{dh}{dt} = \frac{q_{\text{in}} - q_{\text{out}}}{A}, \qquad q_{\text{in}} = K_b \ i, \qquad q_{\text{out}} = \frac{h}{R}$$

donde:

- $$h$$: nivel del líquido $$[m]$$  
- $$i$$: corriente que controla la bomba $$[A]$$  
- $$A$$: área del tanque $$[m^2]$$  
- $$R$$: constante de descarga $$[s/m^2]$$  
- $$K_b$$: ganancia de la bomba $$[m^3/(s·A)]$$

El nivel no puede ser negativo y la corriente se **satura** en el rango $$[i_{\min}, i_{\max}]$$.

### Control PID

$$u(t) = K_p e(t) + K_i \int e(t) \ dt + K_d \frac{de(t)}{dt}$$


donde $$e(t) = \text{SP} - h(t)$$ es el error.

El controlador incluye **anti-windup** simple mediante *clamping* cuando se alcanza la saturación.

---

## Estructura del proyecto

```graphql
src/
  core/
    types.ts        # Tipos e interfaces comunes
    pid.ts          # Controlador PID
    plant.ts        # Modelo dinámico del tanque
    simulator.ts    # Orquestador general
    csv.ts          # Exportación de datos
  components/
    Tank.tsx        # SVG del tanque y la bomba
    Charts.tsx      # Gráficas i(t) y h(t)
    ControlPanel.tsx# Controles y parámetros PID
    Toolbar.tsx     # Encabezado del simulador
  hooks/
    useSimulation.ts# Lógica del bucle de simulación
App.tsx             # Composición principal de la UI
main.tsx            # Punto de entrada
styles.css          # Estilos base
vite.config.ts      # Configuración del entorno
```

---

## Desarrollo local

### Requisitos

- Node.js ≥ 18  
- npm ≥ 8

### Ejecución

```bash
git clone https://github.com/esteel7/pid-tank-sim.git
cd pid-tank-sim
npm install
npm run dev
```

Abrir en el navegador:  
👉 <http://localhost:5173/>

---

## Build de producción

```bash
npm run build
npm run preview
```

Los archivos listos para publicar quedan en la carpeta `dist/`.

---

## Despliegue en GitHub Pages

### Despliegue automático con GitHub Actions ✅

Este repositorio incluye el flujo `.github/workflows/deploy.yml`.  
Cada vez que haces `git push` a `main`, se ejecutan los pasos:

1. Instalar dependencias  
2. Compilar (`npm run build`)  
3. Publicar `dist/` en la rama **`gh-pages`**

### Configuración inicial

1. En GitHub → **Settings → Pages**  
2. En **Source**, selecciona:
   - “Deploy from a branch”
   - **Branch:** `gh-pages` y carpeta `/ (root)`
3. Guarda los cambios.

El sitio quedará disponible en:  
👉 <https://esteel7.github.io/pid-tank-sim/>

---

## Contribuciones

Este proyecto está abierto a colaboraciones académicas, mejoras y nuevas simulaciones.  
Cualquier persona puede proponer **issues** o enviar **pull requests**.

Para contribuir:

1. Crea un **fork** del proyecto.
2. Clona tu fork y crea una rama nueva.
3. Realiza tus cambios y verifica que `npm run dev` funcione.
4. Envía un **Pull Request** hacia la rama principal del repositorio original.

Para más información puedes revisar `CONTRIBUTING.md`.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT.
Puedes usarlo, modificarlo y redistribuirlo libremente, citando la fuente.

## Créditos

Proyecto desarrollado con fines educativos por **Rodrigo Martínez Campos**
