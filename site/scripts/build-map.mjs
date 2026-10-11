// Turns Natural Earth country outlines (world-atlas, public domain) into ready-made
// SVG paths plus projected pin positions, so the site ships no mapping library.
// Usage: node scripts/build-map.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { ALSO, PHOTOS, VISITED } from '../src/data/visited.js'

const require = createRequire(import.meta.url)
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-110m.json'), 'utf8'))
const W = 1000
const H = 500

const land = feature(topo, topo.objects.countries).features.filter((f) => f.id !== '010') // no Antarctica
const projection = geoNaturalEarth1().fitExtent(
  [
    [8, 8],
    [W - 8, H - 8],
  ],
  { type: 'FeatureCollection', features: land },
)
const path = geoPath(projection).digits(1)
const lit = new Set([...VISITED, ...ALSO].map((c) => c.id).filter(Boolean))
const xy = (lonLat) => projection(lonLat).map((n) => Math.round(n * 10) / 10)
const point = ({ pin }) => xy(pin)

const out = {
  width: W,
  height: H,
  countries: land.map((f) => ({ id: f.id, name: f.properties.name, d: path(f), on: lit.has(f.id) })),
  pins: [
    ...VISITED.map((c) => ({ name: c.name, id: c.id, xy: point(c), kind: 'country' })),
    ...ALSO.map((c) => ({ name: c.name, id: c.id, xy: point(c), kind: 'also' })),
  ],
  photos: PHOTOS.map((p) => ({
    name: p.name,
    xy: xy(p.at),
    cxy: xy(p.callout),
    mxy: p.phone,
    thumb: `/photos/ch5/${p.file}-thumb.webp`,
    full: `/photos/ch5/${p.file}.webp`,
  })),
}
const missing = [...lit].filter((id) => !land.some((f) => f.id === id))
if (missing.length) throw new Error(`No map shape for ids: ${missing.join(', ')}`)

writeFileSync(new URL('../src/data/world-map.json', import.meta.url), JSON.stringify(out))
console.log(`${out.countries.length} shapes, ${out.countries.filter((c) => c.on).length} lit, ${out.pins.length} pins, ${out.photos.length} photos`)
