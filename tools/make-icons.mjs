import { chromium } from 'playwright';
import fs from 'node:fs';

const svg = (pad, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#6d3cf5"/>
  </linearGradient></defs>
  ${bg}
  <path transform="translate(${pad} ${pad}) scale(${(512 - pad * 2) / 64})"
        d="M14 47.5 28.8 16h6.6L50 47.5h-6.9l-3.2-7.3H24.3l-3.3 7.3H14Zm12.6-13.1h10.3L32 21.7l-5.4 12.7Z" fill="url(#g)"/>
  <circle cx="256" cy="${pad + (512 - pad * 2) * 0.852}" r="${(512 - pad * 2) * 0.041}" fill="#a78bfa"/>
</svg>`;

const files = [
  ['public/icons/icon-512.png', 512, 56, '<rect width="512" height="512" rx="120" fill="#07070a"/>'],
  ['public/icons/icon-192.png', 192, 22, '<rect width="512" height="512" rx="120" fill="#07070a"/>'],
  // maskable: keep art inside the safe zone (80% middle), full-bleed background
  ['public/icons/icon-maskable-512.png', 512, 108, '<rect width="512" height="512" fill="#07070a"/>'],
];

const browser = await chromium.launch({ args: ['--no-sandbox'] });
fs.mkdirSync('public/icons', { recursive: true });
for (const [path, size, pad, bg] of files) {
  const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg(pad, bg)}</body></html>`,
  );
  await page.waitForTimeout(200);
  await page.locator('svg').screenshot({ path, omitBackground: true });
  console.log('wrote', path);
  await page.close();
}

// Apple touch icon (opaque) + OG image
const og = `<!doctype html><html><head><style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#07070a;font-family:system-ui,sans-serif;overflow:hidden;position:relative;color:#f4f4f7}
  .grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.04) 1px,transparent 1px);background-size:64px 64px}
  .glow{position:absolute;width:900px;height:900px;left:-160px;top:-380px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.28),transparent 62%);filter:blur(28px)}
  .glow2{position:absolute;width:700px;height:700px;right:-220px;bottom:-340px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.16),transparent 65%);filter:blur(28px)}
  .wrap{position:relative;padding:66px 80px 58px;height:100%;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:16px;font-size:17px;letter-spacing:.34em;font-weight:800}
  .mark{width:44px;height:44px}
  h1{font-size:82px;line-height:.94;letter-spacing:-.035em;font-weight:800;margin:0}
  .tag{font-size:24px;color:#a78bfa;letter-spacing:.02em;margin-top:20px}
  .sub{color:#8d8d99;font-size:19px;max-width:790px;line-height:1.5;margin-top:20px}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;font-family:ui-monospace,monospace;font-size:15px;color:#8d8d99;letter-spacing:.16em;text-transform:uppercase}
  .chips{display:flex;gap:10px;margin-top:28px;flex-wrap:wrap}
  .chip{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:9px 16px;font-size:15px;color:#d5d5dd;font-family:ui-monospace,monospace}
</style></head><body>
  <div class="grid"></div><div class="glow"></div><div class="glow2"></div>
  <div class="wrap">
    <div>
      <div class="brand"><svg class="mark" viewBox="0 0 64 64"><path d="M14 47.5 28.8 16h6.6L50 47.5h-6.9l-3.2-7.3H24.3l-3.3 7.3H14Zm12.6-13.1h10.3L32 21.7l-5.4 12.7Z" fill="#a78bfa"/><circle cx="32" cy="54.5" r="2.6" fill="#a78bfa"/></svg>AXLORITECH</div>
      <h1 style="margin-top:44px">Full-Stack<br/>Developer &amp; Builder</h1>
      <div class="tag">Tech Beyond Limits.</div>
      <p class="sub">I build modern web applications, AI-powered products and digital experiences that turn ideas into real products.</p>
      <div class="chips"><span class="chip">Next.js</span><span class="chip">React</span><span class="chip">TypeScript</span><span class="chip">Node.js</span><span class="chip">AI integrations</span></div>
    </div>
    <div class="foot"><span>github.com/axloritech</span><span>x.com/axloritech</span></div>
  </div>
</body></html>`;

const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await ogPage.setContent(og);
await ogPage.waitForTimeout(400);
await ogPage.screenshot({ path: 'public/og.png' });
console.log('wrote public/og.png');

const apple = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await apple.setContent(`<html><body style="margin:0">${svg(24, '<rect width="512" height="512" fill="#07070a"/>')}</body></html>`);
await apple.waitForTimeout(200);
await apple.locator('svg').screenshot({ path: 'app/apple-icon.png' });
console.log('wrote app/apple-icon.png');
await browser.close();
