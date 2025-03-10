import { defineConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  if (process.env.VERCEL_GIT_COMMIT_REF) {
    process.env.VITE_GIT_BRANCH_NAME = process.env.VERCEL_GIT_COMMIT_REF
  }

  try {
    const { execSync } = require('child_process')
    process.env.VITE_GIT_BRANCH_NAME = execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd()
  } catch (error) {
    //ignore error
  }

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
  })
}
