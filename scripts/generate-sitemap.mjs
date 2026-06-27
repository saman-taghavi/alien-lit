import { readdirSync, existsSync, writeFileSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'

const dist = fileURLToPath(new URL('../docs/.vitepress/dist', import.meta.url))
const base = '/alien-lit/'
const hostname = 'https://saman-taghavi.github.io'

function walk(dir) {
  const files = readdirSync(dir, { withFileTypes: true })
  const pages = []
  for (const file of files) {
    const full = join(dir, file.name)
    if (file.isDirectory()) walk(full).forEach(p => pages.push(p))
    else if (file.name === 'index.html') pages.push(join(dir, 'index.html'))
    else if (file.name.endsWith('.html') && file.name !== '404.html') pages.push(full)
  }
  return pages
}

if (!existsSync(dist)) {
  console.error('Dist not found, skipping sitemap')
  process.exit(0)
}

const pages = walk(dist)
const urls = pages.map(p => {
  const rel = relative(dist, p)
  const urlPath = rel === 'index.html' ? '' : rel.replace(/index\.html$/, '').replace(/\.html$/, '')
  return `  <url>
    <loc>${hostname}${base}${urlPath}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf-8')
console.log(`Generated sitemap.xml with ${urls.length} URLs`)
