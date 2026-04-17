import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const OUT = new URL("../public/gbp/", import.meta.url);

// Profile photo: 1080x1080, white background, centered logo + wordmark.
// GBP min 720x720, recommended 1080x1080.
const profileSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="#ffffff"/>
  <g transform="translate(330,340) scale(7.5)">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M38 2h5v36h-5v-3c-1.5 2.2-4 3.5-7 3.5-3 0-5.5-1.2-7.5-3.5S21 30.5 21 27s.8-6.5 2.5-8.8S27 15 30 15c3 0 5.5 1.3 7 3.5V2h1zm-5 30c2 0 3.8-.8 5-2.5V24c-1.2-1.7-3-2.5-5-2.5-2.2 0-4 .8-5.2 2.5-1.2 1.6-1.8 3.5-1.8 5.5s.6 3.8 1.8 5.3c1.2 1.5 3 2.2 5.2 2.2z"
      fill="#3b82f6"/>
    <path d="M2 38V15h5v3.5c1.5-2.5 3.8-4 7-4 1.2 0 2.3.2 3.2.6l-1.5 4.5c-.8-.3-1.6-.5-2.5-.5-2.8 0-4.8 1.5-6.2 4.5V38H2z"
      fill="#0a0a0a"/>
  </g>
  <text x="540" y="820" text-anchor="middle"
    font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif"
    font-size="74" font-weight="700" fill="#0a0a0a" letter-spacing="-2">Raglan Digital</text>
</svg>`;

// Cover photo: 1080x608 (16:9-ish, GBP recommended).
const coverSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="608" viewBox="0 0 1080 608">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1f2e"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="608" fill="url(#bg)"/>

  <!-- subtle dot grid -->
  <g fill="#ffffff" opacity="0.06">
    ${Array.from({ length: 18 }, (_, y) =>
      Array.from({ length: 32 }, (_, x) =>
        `<circle cx="${20 + x * 34}" cy="${20 + y * 34}" r="1.2"/>`
      ).join("")
    ).join("")}
  </g>

  <!-- logo -->
  <g transform="translate(80,140) scale(4.2)">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M38 2h5v36h-5v-3c-1.5 2.2-4 3.5-7 3.5-3 0-5.5-1.2-7.5-3.5S21 30.5 21 27s.8-6.5 2.5-8.8S27 15 30 15c3 0 5.5 1.3 7 3.5V2h1zm-5 30c2 0 3.8-.8 5-2.5V24c-1.2-1.7-3-2.5-5-2.5-2.2 0-4 .8-5.2 2.5-1.2 1.6-1.8 3.5-1.8 5.5s.6 3.8 1.8 5.3c1.2 1.5 3 2.2 5.2 2.2z"
      fill="#60a5fa"/>
    <path d="M2 38V15h5v3.5c1.5-2.5 3.8-4 7-4 1.2 0 2.3.2 3.2.6l-1.5 4.5c-.8-.3-1.6-.5-2.5-.5-2.8 0-4.8 1.5-6.2 4.5V38H2z"
      fill="#ffffff"/>
  </g>

  <!-- wordmark + tagline -->
  <text x="80" y="430"
    font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif"
    font-size="64" font-weight="700" fill="#ffffff" letter-spacing="-1.5">Raglan Digital</text>
  <text x="80" y="490"
    font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif"
    font-size="28" font-weight="400" fill="#9ca3af" letter-spacing="-0.3">Honest websites for Raglan &amp; the Waikato</text>
  <text x="80" y="540"
    font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif"
    font-size="22" font-weight="500" fill="#60a5fa" letter-spacing="0.5">raglandigital.com</text>
</svg>`;

async function render(svg, name) {
  const out = new URL(name, OUT);
  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(out.pathname);
  console.log(`wrote ${out.pathname}`);
}

await render(profileSvg, "profile-1080.png");
await render(coverSvg, "cover-1080x608.png");

// Bonus: square 480x480 thumbnail variant (some directories want smaller)
await sharp(Buffer.from(profileSvg))
  .resize(480, 480)
  .png({ quality: 95 })
  .toFile(new URL("profile-480.png", OUT).pathname);
console.log("wrote profile-480.png");
