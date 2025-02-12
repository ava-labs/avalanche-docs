import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library'
  
  return {
    // Add base configuration for GitHub Pages
    base: process.env.GITHUB_REPOSITORY ? 
      `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/',
    plugins: [
      tailwindcss(),
      react(),
      // Only generate types when building library
      ...(isLibrary ? [
        dts({
          insertTypesEntry: true,
          include: ['src/'],
          tsconfigPath: './tsconfig.app.json'
        })
      ] : [])
    ],
    define: {
      'process.env': {},
    },
    build: isLibrary ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'IsolationExperiment',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      sourcemap: true,
      target: 'esnext',
      minify: false
    } : {
      // Demo website build configuration
      outDir: 'dist-demo',
      entry: resolve(__dirname, 'src/demo.tsx')
    }
  }
})
