import { chromium } from 'playwright';
import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('components/intro/writing-paths.json','utf8'));
const VB = data.viewBox;
const strokes = data.strokes.map((s,i)=>`<path d="${s.d}" fill="none" stroke="${i%2? '#8B5CF6':'#EDEDF2'}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`).join('\n');
const letters = data.strokes.map(s=>`<path d="${s.d}" fill="none" stroke="rgba(139,92,246,.35)" stroke-width="1" stroke-dasharray="3 3"/>`).join('\n');
const html = `<!doctype html><html><body style="margin:0;background:#08080a">
<div style="padding:40px">
<svg viewBox="${VB}" width="1000" xmlns="http://www.w3.org/2000/svg">${strokes}
<line x1="0" y1="${data.baseline}" x2="800" y2="${data.baseline}" stroke="#333" stroke-width="1" stroke-dasharray="4 6"/>
<line x1="0" y1="${data.xHeight}" x2="800" y2="${data.xHeight}" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="4 6"/>
<line x1="0" y1="${data.ascender}" x2="800" y2="${data.ascender}" stroke="#222" stroke-width="1" stroke-dasharray="4 6"/>
</svg></div>
<div style="padding:40px"><svg viewBox="${VB}" width="1400" xmlns="http://www.w3.org/2000/svg">${strokes}</svg></div>
</body></html>`;
fs.writeFileSync('tools/handwriting-preview.html', html);
const b = await chromium.launch({args:['--no-sandbox']});
const p = await b.newPage({viewport:{width:1500,height:800}, deviceScaleFactor:1.5});
await p.goto('file:///home/user/axloritech/tools/handwriting-preview.html');
await p.waitForTimeout(500);
await p.screenshot({path:'tools/handwriting-preview.png', fullPage:true});
await b.close();
console.log('rendered');
