const svelte = require('@sveltejs/vite-plugin-svelte')
const { defineConfig } = require('vite')
const path = require('path')
const fg = require('fast-glob')
const preprocess = require('svelte-preprocess');

const VITE_PORT = 3000;

const viteAttachSite = () => ({
  name: 'vite-attach-site',
  transform(code, id) {
    if (id.lastIndexOf('/node_modules/vite/dist/client/client.js') !== -1) {
      return code.replace('`${socketProtocol}://${socketHost}`', `'ws://127.0.0.1:${VITE_PORT}'`);
    }
  }
})

const postVite = () => ({
  name: 'vite-post',
  transform(code, id) {
    const glob = fg.sync('./src/components/**/*.svelte');
    let imports = '';

    glob.forEach(x => {
      const name = /.+\/([^\/]+).svelte/.exec(x)[1]
      if (imports.length) { imports += ', ' }
      imports += `${name}: (await import("${x.substr(1)}")).default`
    })
    
    return code.replace(`import.meta.svelteGlob()`, `{ ${imports} }`);
  }
})

module.exports = defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    optimizeDeps: {
      exclude: ['@svitejs/hmr-test-dependency']
    },
    plugins: [
      viteAttachSite(),
      svelte(),
      postVite()
    ],
    build: {
      minify: isProduction
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },
    server: {
      port: VITE_PORT,
      strictPort: true
    }
  }
})
