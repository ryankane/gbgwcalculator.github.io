const fs = require('fs');
const https = require('https');
const jsdom = require('jsdom');
const path = require('path');
const url = require('url');
const xml2js = require('xml2js');

const { JSDOM } = jsdom;

const cacheManifest = async (filename) => {
  return new Promise(resolve => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, 744);
    }
    const file = fs.createWriteStream(dataFile);
    https.get(filename, response => {
      const stream = response.pipe(file);
      stream.on('finish', () => resolve());
    });
  });
};

const readData = async (filename) => {
  return new Promise(resolve => {
    const parser = new xml2js.Parser();
    fs.readFile(filename, (err, data) => {
      parser.parseString(data, (err, result) => resolve(result));
    });
  });
};

const readHtml = async (filename, outputDir) => {
  return new Promise(resolve => {
    fs.readFile(filename, 'utf8', (err, html) => {
      const dom = new JSDOM(html);
      const assets = [...dom.window.document.querySelectorAll('img')].map(img => img.getAttribute('src'));
      assets.forEach(assetPath => {
        const urlTokens = new URL(assetPath);
        writeImageToDisk(urlTokens.origin, outputDir, urlTokens.pathname);
      });
      resolve();
    });
  });
};

const writeImages = async (basePath, outputDir, imageEntries) => {
  return new Promise(resolve => {
    imageEntries.forEach(entry => writeImageToDisk(basePath, outputDir, entry['Key'][0]));
    resolve();
  });
};

const writeImageToDisk = async (basePath, outputDir, filename) => {
  return new Promise(resolve => {
    const remoteUrl = url.resolve(basePath, filename);
    const localPath = path.join(outputDir, filename.replace(/[\\\/]+/g, '_'));
    const file = fs.createWriteStream(localPath);
    https.get(remoteUrl, (response) => {
      response.pipe(file);
      resolve();
    });
  });
};

module.exports = { cacheManifest, readData, readHtml, writeImages };