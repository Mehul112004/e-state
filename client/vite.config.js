import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // server: {
  //   proxy:{
  //     '/api': 'http://localhost:300',
  //   }
  // },
  plugins: [react()],
})
