import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Exposes the list of notebooks in public/notebooks as `virtual:notebooks`, so a dropped-in
// .ipynb is picked up without editing code. The dev server reloads when files are added or removed.
function notebooksManifest() {
  const id = 'virtual:notebooks'
  const resolvedId = '\0' + id
  const dir = resolve(__dirname, 'public/notebooks')
  const list = () => (existsSync(dir) ? readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.ipynb')).sort() : [])

  return {
    name: 'notebooks-manifest',
    resolveId: (source) => (source === id ? resolvedId : null),
    load: (loadId) => (loadId === resolvedId ? `export default ${JSON.stringify(list())}` : null),
    configureServer(server) {
      server.watcher.add(dir)
      const onChange = (file) => {
        if (!file.toLowerCase().endsWith('.ipynb')) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', onChange)
      server.watcher.on('unlink', onChange)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), notebooksManifest()],
  base: '/portfolio/',
  build: {
    outDir: 'dist'
  }
})
