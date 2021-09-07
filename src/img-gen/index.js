const myArgs = process.argv.slice(2);
const { buildSetup, createFiles, createMetaData } = require('./generator.js');
const { defaultEdition } = require('./gen-config.js');
const {generateWithDna} = require('./penguun-generator');

if (myArgs.length == 2 && myArgs[0] == 'gen') {
  const edition = myArgs.length > 2 ? Number(myArgs[1]) : defaultEdition;
  buildSetup();
  createFiles(edition);
  createMetaData();
} else {
  const dna = myArgs.length > 0 ? myArgs[0] : '909190909090909090';
  (async () => {
    await generateWithDna(dna);
  })();
}
