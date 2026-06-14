const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

// Global results collector for run-with-report
global.__TEST_RESULTS__ = global.__TEST_RESULTS__ || [];

let driver;
const showBrowser = process.env.SHOW_BROWSER === '1' || process.env.SHOW_BROWSER === 'true';

before(async function() {
  this.timeout(20000);
  const options = new chrome.Options();
  if (!showBrowser) options.headless();
  options.addArguments('--no-sandbox', '--disable-dev-shm-usage');
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  global.driver = driver;
});

after(async function() {
  try {
    if (driver) await driver.quit();
  } catch (e) {
    // ignore
  }
});

afterEach(function() {
  const test = this.currentTest;
  global.__TEST_RESULTS__.push({
    suite: test.parent.fullTitle(),
    title: test.title,
    status: test.state || 'unknown',
    duration: test.duration || 0,
    error: test.err ? (test.err.message || String(test.err)) : ''
  });
});

module.exports = { driver };
