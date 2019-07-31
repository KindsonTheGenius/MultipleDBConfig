const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/pricing-calculator/runtime.js',
    './dist/pricing-calculator/polyfills.js',
    './dist/pricing-calculator/scripts.js',
    './dist/pricing-calculator/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/pricing-calculator.js');
})();
