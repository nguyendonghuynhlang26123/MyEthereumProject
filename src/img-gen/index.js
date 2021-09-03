const myArgs = process.argv.slice(2);
const { buildSetup, createFiles, createMetaData } = require('./generator.js');
const { defaultEdition } = require('./gen-config.js');
const edition = myArgs.length > 0 ? Number(myArgs[0]) : defaultEdition;

(() => {
  buildSetup();
  createFiles(edition);
  createMetaData();
})();
