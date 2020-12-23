const fs = require('fs-extra');
const concat = require('concat');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

let appName = 'pricing-calculator-cushions';
console.log(argv.app);
console.log(appName);

(async function build() {
  const files = [
    './dist/pricing-calculator-cushions/runtime.js',
    './dist/pricing-calculator-cushions/polyfills.js',
    './dist/pricing-calculator-cushions/scripts.js',
    './dist/pricing-calculator-cushions/main.js',
  ];

  await fs.ensureDir('elements');
  await concat(files, `elements/${appName}.js`);
})();
