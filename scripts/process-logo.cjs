// One-off: key out the flat-white background of the supplied NeuraLife
// logo PNG via edge flood-fill (so internal white specular highlights on
// the gold rivets are preserved), producing a transparent-background PNG
// for use on cream/white book pages. Run once; output is committed as a
// static asset, this script is not part of the build.
const fs = require('fs');
const { PNG } = require('pngjs');

const SRC = 'C:/Users/Admin/Downloads/neuralife_logo.png';
const OUT = 'public/book/neuralife-logo.png';

const WHITE_DIST = 26; // max color distance from pure white to key out

const buf = fs.readFileSync(SRC);
const png = PNG.sync.read(buf);
const { width, height, data } = png;

function idx(x, y) { return (width * y + x) << 2; }
function distFromWhite(i) {
  const dr = 255 - data[i], dg = 255 - data[i + 1], db = 255 - data[i + 2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

const visited = new Uint8Array(width * height);
const stack = [];

for (let x = 0; x < width; x++) { stack.push([x, 0]); stack.push([x, height - 1]); }
for (let y = 0; y < height; y++) { stack.push([0, y]); stack.push([width - 1, y]); }

while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;
  const p = y * width + x;
  if (visited[p]) continue;
  visited[p] = 1;
  const i = idx(x, y);
  if (distFromWhite(i) > WHITE_DIST) continue; // not background-white, stop spreading
  data[i + 3] = 0; // make transparent
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

fs.mkdirSync('public/book', { recursive: true });
fs.writeFileSync(OUT, PNG.sync.write(png));
console.log('Wrote', OUT);
