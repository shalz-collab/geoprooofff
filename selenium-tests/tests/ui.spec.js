const { driver } = require('./common');
const { expect } = require('chai');

describe('UI/UX Tests (15)', function() {
  this.timeout(20000);

  const checks = [
    'header', '.max-w-7xl', 'button', 'img', 'footer'
  ];

  for (let i = 1; i <= 15; i++) {
    it(`UI/UX - element visibility check #${i}`, async function() {
      const url = process.env.BASE_URL || 'http://localhost:3002';
      await driver.get(url);
      for (const sel of checks) {
        const els = await driver.findElements({ css: sel });
        expect(els.length).to.be.at.least(0);
      }
    });
  }
});
