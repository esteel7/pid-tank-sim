# Configuración del entorno en Windows

Guía paso a paso para configurar y ejecutar el proyecto **Simulador PID de Tanque** en un equipo con **Windows + VS Code**.

---

## 1. Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Versión recomendada | Verificación |
|--------------|--------------------|---------------|
| **Git** | ≥ 2.40 | `git --version` |
| **Node.js** | ≥ 20.19.0 (se recomienda 22.19.0) | `node -v` |
| **npm** | ≥ 10.0.0 | `npm -v` |
| **Visual Studio Code** | Última versión estable | Abrir VS Code |

> 💡 Si necesitas instalarlas:
> - [Descargar Git](https://git-scm.com/download/win)
> - [Descargar Node.js](https://nodejs.org/)
> - [Descargar VS Code](https://code.visualstudio.com/)

---

## 2. Clonar el repositorio

Abre **PowerShell** o **Git Bash**, y ejecuta:

```bash
cd C:\Users\<tu_usuario>\Documentos\
git clone https://github.com/esteel7/pid-tank-sim.git
cd pid-tank-sim
```

## 3. Instalar dependencias del proyecto

Ejecuta en la carpeta del proyecto:

```bash
npm ci
```

🔍 Este comando instala las dependencias exactamente como están definidas en package-lock.json, asegurando compatibilidad con el entorno de desarrollo oficial (Ubuntu + Node 18/22).

---

## 4. Ejecutar el proyecto en modo desarrollo

Inicia el servidor local de Vite:

```bash
npm run dev
```

Luego abre tu navegador y entra a la dirección que aparece en la consola, normalmente:

http://localhost:5173/


Tu simulador PID de tanque se cargará en el navegador. Si ves una pantalla vacía, presiona `Ctrl + Shift + R` para recargar sin caché.

---

## 5. Estructura del proyecto

```graphql
pid-tank-sim/
│
├── src/
│   ├── core/          # Modelos físicos y controlador PID
│   ├── components/    # Componentes visuales (React)
│   ├── hooks/         # Hooks para simulación y actualización continua
│   └── App.tsx        # Página principal
│
├── public/            # Recursos estáticos (íconos, imágenes)
├── docs/              # Documentación (incluye este archivo)
├── .github/workflows/ # Automatización del despliegue (deploy.yml)
└── package.json       # Configuración del proyecto
```
---

## 6. Desplegar manualmente (opcional)

Si quieres publicar tu propia copia en GitHub Pages:

```bash
npm run build
npm run deploy
```

Luego revisa la URL generada en tu cuenta:
https://<tu_usuario>.github.io/pid-tank-sim/

---

## 7. Nota sobre `package-lock.json`

Al clonar el proyecto y ejecutar `npm ci` o `npm install`, es posible que Git muestre el archivo **`package-lock.json`** como modificado.

Esto ocurre porque:
- La versión local de **npm** puede ser diferente a la del entorno original.
- El archivo se ajusta ligeramente para reflejar metadatos del sistema operativo (Windows vs Linux).
- No se trata de un cambio funcional en el proyecto.

### ¿Qué hacer?

Si **no agregaste nuevas dependencias**, simplemente descarta el cambio:

```bash
git restore package-lock.json
```

O desde VS Code:

1. Abre la vista Control de código fuente (`Ctrl + Shift + G`)

2. Haz clic derecho en `package-lock.json`

3. Selecciona "**Descartar cambios**"

Sólo debes confirmar (`commit`) este archivo cuando:

* Instales o actualices dependencias con `npm install`, o

* Modifiques manualmente el archivo `package.json`.

💡 Consejo: si sólo ejecutaste `npm ci` o `npm run dev`, no subas este cambio.
