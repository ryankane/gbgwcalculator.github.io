const csv = require('csvtojson');
const fs = require('fs');
const https = require('https');
const path = require('path');
const request = require('request');
const url = require('url');
const winston = require('winston');
const yargs = require('yargs');

const serializeName = (filename) => filename.replace(/\./g, '')
    .replace(/\W+/g, '-').toLowerCase();

const antiSpamTimeout = 1000; // Wait 1 second between fetches.
const baseUrl = 'https://wiki.dengekionline.com/gbm/機体一覧/';
const csvFilename = path.join(__dirname, '../../..', 'src/data/csv/units.csv');
const outputDir = './out/dengeki/data';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/dengeki/combined.log' })
  ]
});

const main = async () => {
  await mkdirIfNotExist(outputDir);
  //await cacheUnits();
  await cacheUnit({
    'Name': 'Astray Blue Frame',
    'Subname': '',
    'Japanese': 'アストレイ ブルーフレーム'
  });
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const cacheUnits = async () => {
  const units = await retrieveUnits();
  await asyncForEach(units, async (unit, index) => {
    await cacheUnit(unit, index);
  })
};

const cacheUnit = async (unit, index) => {
  if (!unit['Japanese']) {
    return;
  }

  const unitUrl = url.resolve(baseUrl, unit['Japanese'].replace(' ', '_'));
  const filename = path.resolve(outputDir, `${serializeName(`${unit['Name']} ${unit['Subname']}`.trim())}.html`);

  await writeHtmlToDisk(unitUrl, filename);
  logger.info(`cacheUnit :: Wrote HTML file to disk: ${filename}`);
};

const writeHtmlToDisk = async (requestUrl, filename) => {
  return new Promise(resolve => {
    const file = fs.createWriteStream(filename);
    setTimeout(() => {
      logger.info(`writeHtmlToDisk :: Fetching: ${requestUrl}`);
      https.get(requestUrl, response => {
        const stream = response.pipe(file);
        stream.on('finish', () => resolve());
      });
    }, antiSpamTimeout);
  });
};

const retrieveUnits = async () => {
  return csv().fromFile(csvFilename);
};

const mkdirIfNotExist = async (path, recursive=true) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: recursive })
    logger.info(`mkdirIfNotExist :: Created directory: ${path}`);
  } else {
    logger.info(`mkdirIfNotExist :: Directory already exists: ${path}`);
  }
};

main();