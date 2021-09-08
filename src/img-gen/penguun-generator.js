const genCofig = require('./generator.config.json');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const format = genCofig.generatorConfig.globalFormat;
const layersOrder = genCofig.generatorConfig.layersOrder;
const position = genCofig.generatorConfig.layersPosition;
const size = genCofig.generatorConfig.layersSize;

const INPUT_DIR = 'src/assets/layers';
const OUTPUT_DIR = 'src/assets/output';
const JSON_OUTPUT = 'src/assets/output/json';

const getPenguunPart = (path, partDNA) => {
  const traitFileName = partDNA + '.' + format.fileExtension;
  return fs.readdirSync(path).filter((item) => !/(^|\/)\.[^\/\.]/g.test(item) && item == traitFileName)[0];
};

const getPartInfo = (part, partDNA) => {
  return genCofig.partsList[part].find((p) => p.partId == partDNA);
};

const exportJsonData = (parts, dna) => {
  // fs.writeFileSync(`${JSON_OUTPUT}/${dna}.json`, JSON.stringify({
  //   name: "NONAME",
  //   bornAt
  // }));
};

const preprocessDna = (dna) => {
  if (dna.length == 17) return '0' + dna; // Trimming 0 due to storage problem
  if (dna.length != 18) throw new Error('Invalid DNA');
  return dna;
};

const generate = async (dna, inputDir, outputDir) => {
  dna = preprocessDna(dna);

  const canvas = createCanvas(format.width, format.height);
  const ctx = canvas.getContext('2d');
  const dnaParts = dna
    .match(/.{1,2}/g)
    .reverse()
    .map((num) => Number(num)); // Need to reverse to match layers order

  const layers = layersOrder.map((layer, index) => ({
    ...getPartInfo(layer, dnaParts[index]),
    dna: dnaParts[index],
    location: `${inputDir}/${layer}/`,
    element: getPenguunPart(`${inputDir}/${layer}/`, dnaParts[index]),
    position: { x: position[layer][0], y: position[layer][1] },
    size: { width: size[layer][0], height: size[layer][1] },
  }));

  //Drawing:
  ctx.clearRect(0, 0, format.width, format.height);
  for (const layer of layers) {
    console.log(`Drawing ${layer.name}, part dna: ${layer.dna}, part name = ${layer.partName}, rarity = ${layer.rarity}, part file = ${layer.element}`);
    const image = await loadImage(`${layer.location}${layer.element}`);
    ctx.drawImage(image, layer.position.x, layer.position.y, layer.size.width, layer.size.height);
    fs.writeFileSync(`${outputDir}/${dna}.png`, canvas.toBuffer('image/png'));
  }
  return layers;
};

const generateWithDna = async (data) => generate(data, INPUT_DIR, OUTPUT_DIR);
const dnaToParts = async (dna) => {
  dna = preprocessDna(dna);
  const dnaParts = dna
    .match(/.{1,2}/g)
    .reverse()
    .map((num) => Number(num));
  const data = {};
  layersOrder.forEach((layer, index) => {
    data[layer] = getPartInfo(layer, dnaParts[index]);
  });
  return data;
};

module.exports = { generateWithDna, generate, dnaToParts };
