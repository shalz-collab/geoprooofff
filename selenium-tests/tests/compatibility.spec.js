const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Compatibility Tests (10 viewport sizes)', function() {
  this.timeout(60000);

  const sizes = [
    { w: 1920, h: 1080 }, { w: 1366, h: 768 }, { w: 1440, h: 900 },
    { w: 1280, h: 800 }, { w: 1024, h: 768 }, { w: 800, h: 600 },
    { w: 360, h: 800 }, { w: 412, h: 915 }, { w: 390, h: 844 }, { w: 320, h: 568 }
  ];

  sizes.forEach((s, idx) => {
    it(`Compatibility - viewport ${s.w}x${s.h}`, async function() {
      const options = new chrome.Options();
      options.headless();
      const drv = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
      try {
        await drv.manage().window().setRect({ width: s.w, height: s.h });
        await drv.get(process.env.BASE_URL || 'http://localhost:3002');
        const title = await drv.getTitle();
        expect(title.toLowerCase()).to.include('geoproof');
      } finally {
        await drv.quit();
      }
    });
  });
});
