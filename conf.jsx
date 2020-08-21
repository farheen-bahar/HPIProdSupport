const path = require('path');
const downloadsPath = path.resolve(__dirname, './downloads');

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
    elementScrollBehavior: 1,
    nativeEvents: false,
     chromeOptions: {
      w3c: false,
      // args: ['--headless', '--disable-gpu'],
      // args: ['--user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data'],
      prefs: {
        credentials_enable_service: true,
        profile: {
          password_manager_enabled: true
        }
      }
    } 
  },
  onPrepare: () => {
    EC = protractor.ExpectedConditions;
  }
}