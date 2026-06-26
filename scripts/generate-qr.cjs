const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const DECK_URL = 'https://pavancloudcreds-cmd.github.io/neuralife-pitch/';
const outDir = path.join(__dirname, '..', 'print-assets');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const options = {
  errorCorrectionLevel: 'H',   // highest tier — adds redundancy so the
                                 // code still scans even with minor
                                 // print imperfections or smudging
  margin: 4,                    // standard quiet zone, do not reduce —
                                 // this is what lets scanners detect
                                 // the code boundary reliably
  width: 1200,                  // generous resolution — far beyond
                                 // what 300 DPI needs at card size,
                                 // gives headroom to scale freely
  color: { dark: '#000000', light: '#FFFFFF' },  // pure black/white —
                                 // do not recolor, this is what
                                 // protects scan reliability
};

QRCode.toFile(path.join(outDir, 'qrcode-print.png'), DECK_URL, options, (err) => {
  if (err) throw err;
  console.log('PNG saved to print-assets/qrcode-print.png');
});

QRCode.toString(DECK_URL, { type: 'svg', errorCorrectionLevel: 'H', margin: 4 },
  (err, svgString) => {
    if (err) throw err;
    fs.writeFileSync(path.join(outDir, 'qrcode-print.svg'), svgString);
    console.log('SVG saved to print-assets/qrcode-print.svg');
  });
