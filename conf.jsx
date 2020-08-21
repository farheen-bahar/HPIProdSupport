const path = require('path');
const downloadsPath = path.resolve(__dirname, './downloads');

exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 150000,
    includeStackTrace: true
  },
  // directConnect: true,
  getPageTimeout: 150000,
  allScriptsTimeout: 120000,
  specs: ['./spec/**/*.*'],
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumArgs: ['-Dwebdriver.edge.driver=D:/Users/bahar/Desktop/Automation/msedgedriver.exe'],
  capabilities: {
    browserName: 'chrome',
    // browserName: 'MicrosoftEdge',
    elementScrollBehavior: 1,
    nativeEvents: false,
     chromeOptions: {
      w3c: false,
      // args: ["--headless", "--disable-gpu", "--window-size=800x600"],
      // args: ['--user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data'],
      prefs: {
        credentials_enable_service: true,
        profile: {
          password_manager_enabled: true
        },
        download: {
          directory_upgrade: true,
          prompt_for_download: false,
          default_directory: downloadsPath,
        }
      }
    } 
  }
}