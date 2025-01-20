import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    strictPort: true, // 지정된 포트 사용 불가능한 경우, 실행 실패
    host: true, // 네트워크 액세스 허용
  }
})