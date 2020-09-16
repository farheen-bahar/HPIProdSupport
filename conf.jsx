const path = require('path');
require('dotenv').config();
/**
 * Add the following values in .env file in the root directory
 * HP_USERNAME=<username>
 * HP_PASSWORD=<password>
 * CHROME_DATA=<chrome user data folder path>
 */

exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 150000,
    includeStackTrace: true
  },
  directConnect: true,
  getPageTimeout: 150000,
  allScriptsTimeout: 120000,
  specs: ['./spec/**/*.*'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      w3c: false,
      args: [/* '--user-data-dir=' + process.env.CHROME_DATA, '--headless',  */'--disable-gpu']
    }
  },
  params: {
    login: {
      username: process.env.HP_USERNAME,
      password: process.env.HP_PASSWORD
    }
  },
  onPrepare: () => {
    EC = protractor.ExpectedConditions;
  }
}