# Guía de Contribución

¡Gracias por tu interés en aportar a **pid-tank-sim**! Este proyecto busca ser una base clara y reutilizable para simulaciones de control en la web (React + TypeScript + Vite). A continuación encontrarás cómo proponer ideas, reportar problemas y enviar cambios por Pull Request.

---

## Principios

- **Docencia primero**: claridad del modelo y del código por sobre la micro-optimización.
- **Modularidad**: lógica de simulación en `src/core/`, UI en `src/components/`, orquestación en `src/hooks/`.
- **Cambios pequeños y revisables**: PRs enfocados, con descripción clara y comprobables localmente.

---

## Reportar errores 🐞 o sugerir mejoras (Issues)

1. Ve a **Issues**: https://github.com/esteel7/pid-tank-sim/issues
2. Crea un **New issue** con un título descriptivo.
3. Incluye:
   - Qué sucede o qué te gustaría mejorar.
   - Pasos para reproducir (si es un bug).
   - Archivos o módulos relacionados, si los conoces.
4. Etiquetas sugeridas: `bug`, `enhancement`, `documentation`, `help wanted`, `good first issue`.

> Tip: Antes de abrir un issue, busca si ya existe uno similar.

---

## Flujo para contribuir con código (Pull Requests)

### 1) Haz un fork y clona tu copia

```bash
git clone https://github.com/TU_USUARIO/pid-tank-sim.git
cd pid-tank-sim
npm install
npm run dev   # abre http://localhost:5173/
```

### 2) Crea una rama descriptiva

```bash
git checkout -b feature/nueva-funcion
# o: fix/bug-descripcion-corta
```

### 3) Realiza tus cambios

- Cambios de **modelo**: crea/edita clases en `src/core/` (p. ej., `plant_mi_proceso.ts`).
- Cambios de **UI**: componentes en `src/components/` (p. ej., agregar gráficos/controles).
- Orquestación: `src/hooks/useSimulation.ts`.
- Actualiza documentación (`README.md`) si el comportamiento visible cambia.

### 4) Verifica localmente

Asegúrate de que el proyecto corre sin errores:

```bash
npm run dev
```

### 5) Commits y push

```bash
git add .
git commit -m "feat: agrega planta con descarga no lineal"
git push origin feature/nueva-funcion
```

> Recomendado (opcional): estilo **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).

### 6) Abre tu Pull Request

En tu repo aparecerá “Compare & pull request”. Verifica el destino:

```
base repository: esteel7/pid-tank-sim
base branch: main
compare: TU_USUARIO:feature/nueva-funcion
```

Incluye una descripción clara (qué cambia, por qué, cómo probarlo).

---

##  Checklist para PRs

- [ ] El proyecto corre en local (`npm run dev`) sin errores.
- [ ] Los cambios están acotados y descritos en el PR.
- [ ] Se actualizó el `README.md` si hace falta.
- [ ] No se suben artefactos de build (`dist/`) ni `node_modules/`.
- [ ] Se mantienen las rutas y aliases (`@core/*`, `@components/*`, `@hooks/*`).

---

##  Estilo y organización del código

- **TypeScript estricto** y tipos explícitos en `core`.
- Componentes **React funcionales** con hooks.
- Evitar dependencias pesadas; preferir soluciones simples.
- Archivos cortos y con **nombres descriptivos**.
- Reutiliza utilidades existentes antes de crear nuevas.

---

## Pruebas manuales mínimas

Antes de enviar tu Pull Request, verifica casos típicos:

- Modo **Manual**: el slider de corriente mueve el nivel esperado.
- Modo **PID**: el sistema converge razonablemente al setpoint (ajustando Kp/Ki/Kd).
- **Saturación** de corriente: no rompe la simulación.
- **Exportar CSV**: descarga con columnas correctas.
- La app carga correctamente tanto en **dev** ( `/` ) como en **build/GitHub Pages** ( `/<repo>/` ).

---

## Lanzamientos (Releases) — opcional

Si mantienes un cambio “estable” para un curso/semestre, puedes proponer un **tag** y **Release** con un pequeño changelog. El despliegue en GitHub Pages es automático al hacer push a `main`.

---

## Licencia y créditos

El proyecto usa **MIT**. Si tu aporte incluye código de terceros, deja la atribución correspondiente. Si usas este simulador en docencia, considera citar el repositorio.

---
