// GitHub Pages serves 404.html for unknown paths. Copying index.html there lets
// React Router handle deep links (/lesson/x) on refresh.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('dist/404.html created (SPA fallback)')
