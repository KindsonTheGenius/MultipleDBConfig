const fs = require('fs-extra');
const concat = require('concat');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

let appName = argv.app;

(async function build() {
  const files = [
    `./dist/apps/${appName}/runtime.js`,
    `./dist/apps/${appName}/polyfills.js`,
    `./dist/apps/${appName}/styles.js`,
    `./dist/apps/${appName}/main.js`,
  ];

  await fs.ensureDir('elements');
  await concat(files, `elements/${appName}.js`);
})();
