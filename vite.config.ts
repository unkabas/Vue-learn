import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vue()],
	base: '/Vue-learn/',
	resolve: {
		alias: {
			'@': '/src',
		},
	},
})
