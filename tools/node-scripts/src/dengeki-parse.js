const csv = require('csvtojson');
const fs = require('fs');
const https = require('https');
const jsdom = require('jsdom');
const path = require('path');
const request = require('request');
const url = require('url');
const winston = require('winston');
const yargs = require('yargs');

const { JSDOM } = jsdom;

const dataDirectory = path.join(__dirname, '../out/dengeki/data');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/dengeki/combined.log' })
  ]
});

const main = async () => {
  readFiles(dataDirectory, (filename, content) => {
    logger.info(`main :: Parsing: ${filename}`);
    parseHtml(filename, content);
  }, (err) => {
    logger.error(err);
  });
};

const parseHtml = (filename, content) => {
  const dom = new JSDOM(content);
  const wikiBody = dom.window.document.querySelector('#wiki-body');
  const h3 = wikiBody.querySelector('h3#content_1001_0');

  console.log(h3.textContent);
};

const readFiles = (dirname, onFileContent, onError) => {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(path.join(dirname, filename), 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
};

main();