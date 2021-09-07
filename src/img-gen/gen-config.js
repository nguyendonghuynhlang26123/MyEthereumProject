const genCofig = require('./generator.config.json');
const layersOrder = genCofig.generatorConfig.layersOrder;

const position = genCofig.generatorConfig.layersPosition;

const size = genCofig.generatorConfig.layersSize;
const format = genCofig.generatorConfig.globalFormat;

const partLists = genCofig.partsList;
const partRarity = genCofig.rarity;

const rarity = [
  { key: '', val: 'original' },
  { key: '_r', val: 'rare' },
  { key: '_sr', val: 'super rare' },
];

const defaultEdition = 5;

const inputDir = 'src/assets/layers';
const outputDir = 'src/assets/output';

module.exports = {
  layersOrder,
  format,
  rarity,
  defaultEdition,
  inputDir,
  outputDir,
  position,
  size,
  partLists,
  partRarity,
};
