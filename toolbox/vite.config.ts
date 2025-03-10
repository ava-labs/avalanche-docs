import { defineConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  // Get current git branch name
  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd()

  // Set it as an environment variable with VITE_ prefix so it's exposed to the client
  process.env.VITE_GIT_BRANCH_NAME = branchName

  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
  })
}
