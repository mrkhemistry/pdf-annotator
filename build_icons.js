const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

const svg = fs.readFileSync('icon.svg', 'utf8');
const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];

for (const size of sizes) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const png = resvg.render().asPng();
  fs.writeFileSync(`icon-${size}.png`, png);
  console.log(`Wrote icon-${size}.png`);
}
