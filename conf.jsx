const path = require('path');
const childProcess = require('child_process');
require('dotenv').config();

exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 500000,
    includeStackTrace: true
  },
  directConnect: true,
  singleRun: false,
  getPageTimeout: 150000,
  allScriptsTimeout: 120000,
  specs: ['./spec/**/*.*'],
  chromeDriver:'C:/Users/fbahar/Downloads/chromedriver-win64/chromedriver.exe',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      args: [
        '--disable-gpu',
        '--no-sandbox',
        `--user-data-dir=${process.env.CHROME_DATA}`
      ]
    }
  },
  directConnect: true,
  params: {
    login: {
      username: process.env.HP_USERNAME,
      password: process.env.HP_PASSWORD
    }
  },
  onPrepare: () => {
    EC = protractor.ExpectedConditions;
  },
  // beforeLaunch: () => {
  //   childProcess.exec('webdriver-manager update --versions.chrome=127.0.6533.120', (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error updating ChromeDriver: ${error}`);
  //     } else {
  //       console.log(`ChromeDriver updated to version 127.0.6533.120`);
  //     }
  //   });
  // }
}