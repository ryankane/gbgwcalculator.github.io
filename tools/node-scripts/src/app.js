const fs = require('fs');
const path = require('path');
const request = require('request');
const winston = require('winston');
const yargs = require('yargs');

const { cacheManifest, readData, writeImages, readHtml } = require('./utils');

const manifestPath = 'https://gb-sp-web.gb-sp.channel.or.jp/';
const outputDir = './out';
const dataFile = `${outputDir}/data.xml`;
const htmlFile = `${outputDir}/index.xml`;

const DEBUG = false;

const filterEnglishOnly = (entry) => entry['Key'][0].endsWith('_en.png');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

const main = async (argv) => {
  logger.info('main :: argv', {argv: argv});

  if (DEBUG) {
    await cacheLegacyImages();
  }
  await cacheLatestImages();
  return 0;
};

const cacheLatestImages = async () => {
  if (DEBUG) {
    request('https://gb-sp-web.gb-sp.channel.or.jp/gb-sp-web/static/en/')
        .pipe(fs.createWriteStream(htmlFile));
  }

  await readHtml(path.join(__dirname, '..', htmlFile), outputDir);
};

const cacheLegacyImages = async () => {
  if (argv.latest === true) {
    logger.info('main :: Caching manifest...');
    await cacheManifest(manifestPath)
        .then(() => {
          logger.info('cacheManifest :: Manifest were successfully cached.')
        });
  }
  if (!fs.existsSync(dataFile)) {
    logger.warn('main :: Manifest has not been cached yet!');
    return 1;
  }
  await readData(path.join(__dirname, '..', dataFile))
      .then(entries => {
        writeImages(manifestPath, outputDir, entries['ListBucketResult']['Contents'].filter(filterEnglishOnly));
      });
};

const argv = yargs
    .option('latest', {
      alias: 'l',
      description: 'Pull latest and re-cache',
      type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

main(argv).then(r => {
  logger.info('main :: Done.');
});