const layersOrder = [
  'bg',
  'tail',
  'back',
  'fur',
  'belly',
  'eyes',
  'mouth',
  'ribbon',
  'horn',
];

const position = {
  'bg': [0, 0],
  'tail': [428, 385],
  'back': [303, 30],
  'fur': [0, 0],
  'belly': [0, 0],
  'eyes': [48, 204],
  'mouth': [119, 272],
  'ribbon': [120, 362],
  'horn': [111, 46],
};

const size = {
  'bg': [700, 600],
  'tail': [250, 150],
  'back': [215, 222],
  'fur': [700, 600],
  'belly': [700, 600],
  'eyes': [240, 100],
  'mouth': [80, 90],
  'ribbon': [70, 60],
  'horn': [170, 150],
};
const format = {
  width: 700,
  height: 600,
};

const rarity = [
  { key: '', val: 'original' },
  { key: '_r', val: 'rare' },
  { key: '_sr', val: 'super rare' },
];

const defaultEdition = 5;

const inputDir = 'src/assets/layers/';
const outputDir = 'src/assets/output/';

module.exports = {
  layersOrder,
  format,
  rarity,
  defaultEdition,
  inputDir,
  outputDir,
  position,
  size,
};
