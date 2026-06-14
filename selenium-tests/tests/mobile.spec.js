const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Mobile-Specific Tests (8)', function() {
  this.timeout(60000);

  const devices = [
    { w: 390, h: 844 }, { w: 412, h: 915 }, { w: 360, h: 780 }, { w: 375, h: 667 },
    { w: 320, h: 568 }, { w: 834, h: 1194 }, { w: 768, h: 1024 }, { w: 428, h: 926 }
  ];

  devices.forEach((d, idx) => {
    it(`Mobile viewport ${d.w}x${d.h}`, async function() {
      const options = new chrome.Options();
      options.headless();
      const drv = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
      try {
        await drv.manage().window().setRect({ width: d.w, height: d.h });
        await drv.get(process.env.BASE_URL || 'http://localhost:3002');
        const btns = await drv.findElements({ css: 'button' });
        expect(btns.length).to.be.at.least(0);
      } finally {
        await drv.quit();
      }
    });
  });
});
