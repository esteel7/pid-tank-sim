import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// base = '/' en dev; '/pid-tank-sim/' sólo al construir
export default defineConfig(({ command }) => ({
  plugins: [react(), tsconfigPaths()],
  base: command === 'build' ? '/pid-tank-sim/' : '/',
}))
