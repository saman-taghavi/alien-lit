import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'docs', 'public')
const outPath = join(outDir, 'og-image.png')
const W = 1200
const H = 630

function svg() {
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0618"/>
      <stop offset="30%" stop-color="#100826"/>
      <stop offset="70%" stop-color="#0e0620"/>
      <stop offset="100%" stop-color="#080312"/>
    </linearGradient>

    <radialGradient id="nebula1" cx="20%" cy="70%" r="50%">
      <stop offset="0%" stop-color="#33cd56" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#33cd56" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebula2" cx="80%" cy="20%" r="45%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebula3" cx="50%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="hexCenter" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>

    <linearGradient id="hexFace1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.25"/>
    </linearGradient>

    <linearGradient id="hexFace2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.25"/>
    </linearGradient>

    <linearGradient id="hexFace3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#4ade80" stop-opacity="0.15"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="30%" stop-color="#2dd4bf"/>
      <stop offset="60%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#4ade80"/>
    </linearGradient>

    <linearGradient id="panelBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 20, 55, 0.65)"/>
      <stop offset="100%" stop-color="rgba(15, 8, 32, 0.7)"/>
    </linearGradient>

    <linearGradient id="panelBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0"/>
      <stop offset="30%" stop-color="#4ade80" stop-opacity="0.2"/>
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#7c3aed" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </linearGradient>

    <filter id="hexGlow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="g1"/>
      <feMerge><feMergeNode in="g1"/><feMergeNode in="g1"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>

    <filter id="outerGlow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
    </filter>

    <filter id="orbGlow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
    </filter>

    <filter id="textGlow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="g2"/>
      <feMerge><feMergeNode in="g2"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>

    <clipPath id="hexClip">
      <polygon points="0,-55 47.6,-27.5 47.6,27.5 0,55 -47.6,27.5 -47.6,-27.5"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#nebula1)"/>
  <rect width="${W}" height="${H}" fill="url(#nebula2)"/>
  <rect width="${W}" height="${H}" fill="url(#nebula3)"/>

  <g opacity="0.25">
    ${(() => {
      let s = 9876
      const next = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
      return Array.from({ length: 40 }, () => {
        const r = 0.3 + next() * 1.3
        return `<circle cx="${(next() * W).toFixed(0)}" cy="${(next() * H).toFixed(0)}" r="${r.toFixed(1)}" fill="#e0e7ff"/>`
      }).join('')
    })()}
  </g>

  <g opacity="0.08">
    ${(() => {
      let s = 5432
      const next = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
      return Array.from({ length: 8 }, () => {
        const cx = next() * W
        const cy = next() * H
        const r = 20 + next() * 60
        return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="#a5b4fc" filter="url(#outerGlow)"/>`
      }).join('')
    })()}
  </g>

  <g transform="translate(600, 248)">
    <text x="0" y="0" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif" font-size="54" opacity="0.08" filter="url(#outerGlow)">👽</text>

    <circle cx="0" cy="0" r="130" fill="none" stroke="#4ade80" stroke-width="0.5" opacity="0.08" stroke-dasharray="8 12"/>
    <circle cx="0" cy="0" r="145" fill="none" stroke="#22d3ee" stroke-width="0.3" opacity="0.05" stroke-dasharray="3 8"/>

    <circle cx="0" cy="0" r="105" fill="none" stroke="#22d3ee" stroke-width="0.5" opacity="0.06"/>

    <g transform="rotate(0)">
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#4ade80" stroke-width="0.8" opacity="0.12" transform="rotate(0)"/>
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#22d3ee" stroke-width="0.6" opacity="0.1" transform="rotate(30)"/>
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#a78bfa" stroke-width="0.6" opacity="0.1" transform="rotate(60)"/>
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#4ade80" stroke-width="0.5" opacity="0.08" transform="rotate(90)"/>
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#22d3ee" stroke-width="0.5" opacity="0.08" transform="rotate(120)"/>
      <ellipse cx="0" cy="0" rx="100" ry="14" fill="none" stroke="#a78bfa" stroke-width="0.5" opacity="0.07" transform="rotate(150)"/>
    </g>

    <circle cx="0" cy="0" r="80" fill="none" stroke="#4ade80" stroke-width="0.3" opacity="0.08" stroke-dasharray="2 6"/>

    <g>
      <circle cx="0" cy="-100" r="1.5" fill="#4ade80" opacity="0.4"/>
      <circle cx="-86.6" cy="-50" r="1.5" fill="#22d3ee" opacity="0.35"/>
      <circle cx="-86.6" cy="50" r="1.5" fill="#a78bfa" opacity="0.35"/>
      <circle cx="0" cy="100" r="1.5" fill="#4ade80" opacity="0.3"/>
      <circle cx="86.6" cy="50" r="1.5" fill="#22d3ee" opacity="0.35"/>
      <circle cx="86.6" cy="-50" r="1.5" fill="#a78bfa" opacity="0.35"/>
    </g>

    <circle cx="0" cy="0" r="75" fill="#4ade80" opacity="0.04" filter="url(#hexGlow)"/>

    <g clip-path="url(#hexClip)">
      <polygon points="0,-55 47.6,-27.5 47.6,27.5 0,55 -47.6,27.5 -47.6,-27.5" fill="url(#hexFace1)"/>
      <polygon points="0,-55 47.6,-27.5 47.6,0 0,27.5" fill="url(#hexFace2)"/>
      <polygon points="-47.6,-27.5 0,-55 0,27.5 -47.6,0" fill="url(#hexFace3)"/>
      <polygon points="0,0 47.6,27.5 0,55 -47.6,27.5" fill="url(#hexFace2)" opacity="0.7"/>
      <polygon points="0,-55 23.8,-13.8 0,13.8 -23.8,-13.8" fill="#fff" opacity="0.1"/>
    </g>

    <polygon points="0,-55 47.6,-27.5 47.6,27.5 0,55 -47.6,27.5 -47.6,-27.5" fill="none" stroke="url(#titleGrad)" stroke-width="2" opacity="0.65" filter="url(#orbGlow)"/>

    <circle cx="0" cy="0" r="35" fill="none" stroke="#22d3ee" stroke-width="0.8" opacity="0.15"/>
    <circle cx="0" cy="0" r="22" fill="url(#hexCenter)" opacity="0.15"/>
    <circle cx="0" cy="0" r="12" fill="#4ade80" opacity="0.5" filter="url(#orbGlow)"/>
    <circle cx="0" cy="0" r="5" fill="#fff" opacity="0.8"/>
    <circle cx="-1.5" cy="-1.5" r="2" fill="#fff" opacity="0.4"/>
  </g>

  <text x="600" y="398" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="78" font-weight="800" letter-spacing="2" fill="url(#titleGrad)" filter="url(#textGlow)">
    alien-lit
  </text>

  <rect x="435" y="428" width="330" height="1" fill="url(#panelBorder)"/>

  <text x="600" y="460" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="8" fill="#6366a0">
    SIGNAL-BASED REACTIVITY FOR LIT
  </text>

  <g transform="translate(380, 520)">
    <rect x="0" y="0" width="440" height="44" rx="22" fill="url(#panelBg)" stroke="rgba(165,180,252,0.06)" stroke-width="0.5"/>

    <g transform="translate(28, 22)">
      <circle cx="0" cy="0" r="5" fill="#4ade80" opacity="0.4"/>
      <circle cx="0" cy="0" r="2" fill="#4ade80"/>
      <text x="14" y="5" font-family="system-ui,sans-serif" font-size="14" fill="#c4b5fd" font-weight="500">alien-signals</text>
    </g>

    <g transform="translate(215, 22)">
      <circle cx="0" cy="0" r="5" fill="#22d3ee" opacity="0.4"/>
      <circle cx="0" cy="0" r="2" fill="#22d3ee"/>
      <text x="14" y="5" font-family="system-ui,sans-serif" font-size="14" fill="#c4b5fd" font-weight="500">1.63 KB gzip</text>
    </g>

    <g transform="translate(365, 22)">
      <circle cx="0" cy="0" r="5" fill="#a78bfa" opacity="0.4"/>
      <circle cx="0" cy="0" r="2" fill="#a78bfa"/>
      <text x="14" y="5" font-family="system-ui,sans-serif" font-size="14" fill="#c4b5fd" font-weight="500">Lit 2/3</text>
    </g>
  </g>
</svg>`
}

async function main() {
  mkdirSync(outDir, { recursive: true })
  const start = performance.now()

  await sharp(Buffer.from(svg()))
    .resize(W, H)
    .png({ compressionLevel: 9 })
    .toFile(outPath)

  const elapsed = ((performance.now() - start) / 1000).toFixed(2)
  const stats = (await import('fs')).statSync(outPath)
  const kb = (stats.size / 1024).toFixed(1)
  console.log(`✅ ${outPath} (${kb} KB, ${elapsed}s)`)
}

main().catch(err => { console.error('Failed:', err); process.exit(1) })
