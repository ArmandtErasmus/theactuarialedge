// Serves dist/ the way GitHub Pages does: static files, and 404.html (status 404)
// for anything else. Use it to check deep links before deploying.
//   npm run build && node scripts/serve-pages.ts [port] [dir]
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve(import.meta.dirname, '..', process.argv[3] ?? 'dist')
const port = Number(process.argv[2] ?? 4173)
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0])
    let file = path.join(dist, url)
    if (!file.startsWith(dist)) return res.writeHead(403).end()
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (fs.existsSync(file)) {
      res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' })
      return fs.createReadStream(file).pipe(res)
    }
    res.writeHead(404, { 'content-type': types['.html'] })
    fs.createReadStream(path.join(dist, '404.html')).pipe(res)
  })
  .listen(port, () => console.log(`GitHub Pages-style preview: http://localhost:${port}`))
