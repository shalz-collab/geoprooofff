const { driver } = require('./common');
const { expect } = require('chai');

describe('Functional Tests (20)', function() {
  this.timeout(20000);

  for (let i = 1; i <= 20; i++) {
    it(`Functional - navigation and UI basic check #${i}`, async function() {
      const url = process.env.BASE_URL || 'http://localhost:3002';
      await driver.get(url);
      const title = await driver.getTitle();
      expect(title.toLowerCase()).to.include('geoproof');

      // Check main heading exists
      const h1 = await driver.findElement({ css: 'h1' });
      const text = await h1.getText();
      expect(text.length).to.be.greaterThan(5);
    });
  }
});
