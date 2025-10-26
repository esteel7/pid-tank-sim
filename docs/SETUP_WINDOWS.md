# 🧰 Configuración del entorno en Windows

Guía paso a paso para configurar y ejecutar el proyecto **Simulador PID de Tanque** en un equipo con **Windows + VS Code**.

---

## 📦 1. Requisitos previos

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

## 🧭 2. Clonar el repositorio

Abre **PowerShell** o **Git Bash**, y ejecuta:

```bash
cd C:\Users\<tu_usuario>\Documentos\
git clone https://github.com/esteel7/pid-tank-sim.git
cd pid-tank-sim
```