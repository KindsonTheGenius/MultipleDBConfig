const fs = require('fs-extra');
const concat = require('concat');

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let appName = argv.app



  (async function build() {
    const files = [
      `./dist/${appName}/runtime.js`,
      `./dist/${appName}/polyfills.js`,
      `./dist/${appName}/scripts.js`,
      `./dist/${appName}/main.js`,
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/' + appName + '.js');
  })();
