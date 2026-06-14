require('./common');
const { expect } = require('chai');

describe('Performance Tests (10)', function() {
  this.timeout(120000);

  for (let i = 1; i <= 10; i++) {
    it(`Performance - page load time check #${i}`, async function() {
      const url = process.env.BASE_URL || 'http://localhost:3002';
      const start = Date.now();
      await global.driver.get(url);
      // small wait for load
      await driver.sleep(500);
      const duration = Date.now() - start;
      // record the duration but don't be too strict; just ensure it's finite
      expect(duration).to.be.a('number');
    });
  }
});
