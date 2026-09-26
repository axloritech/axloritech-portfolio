import { chromium } from 'playwright';
import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('components/intro/writing-paths.json','utf8'));
const b = await chromium.launch({ args:['--no-sandbox'] });
const p = await b.newPage();
await p.setContent(`<svg id="s" viewBox="${d.viewBox}" width="800" xmlns="http://www.w3.org/2000/svg">
  ${d.strokes.map(s=>`<path id="p" d="${s.d}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`).join('')}
</svg>`);
const bbox = await p.evaluate(() => {
  const paths = [...document.querySelectorAll('path')];
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for (const el of paths) {
    const bb = el.getBBox();
    const sw = 7; // stroke width extends by half on each side
    x0=Math.min(x0, bb.x-sw/2); y0=Math.min(y0, bb.y-sw/2);
    x1=Math.max(x1, bb.x+bb.width+sw/2); y1=Math.max(y1, bb.y+bb.height+sw/2);
  }
  return { x0:+x0.toFixed(1), y0:+y0.toFixed(1), x1:+x1.toFixed(1), y1:+y1.toFixed(1),
           w:+(x1-x0).toFixed(1), h:+(y1-y0).toFixed(1) };
});
console.log('ink bbox:', bbox);
// a viewBox that centres the ink with breathing room
const pad = 14;
const vb = [bbox.x0-pad, bbox.y0-pad, bbox.w+pad*2, bbox.h+pad*2].map(v=>+v.toFixed(1));
console.log('suggested viewBox:', vb.join(' '), 'aspect', (vb[2]/vb[3]).toFixed(3));
await b.close();
