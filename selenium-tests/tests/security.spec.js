const axios = require('axios');
const { expect } = require('chai');

describe('Security Tests (5)', function() {
  this.timeout(20000);

  for (let i = 1; i <= 5; i++) {
    it(`Security - basic header check #${i}`, async function() {
      const url = process.env.BASE_URL || 'http://localhost:3002';
      const res = await axios.head(url).catch(err => err.response || {});
      expect(res.status).to.be.oneOf([200, 301, 302]);
      // Check that server does not leak surprising stack traces via body (basic)
      const get = await axios.get(url).catch(err => err.response || {});
      const body = (get.data && typeof get.data === 'string') ? get.data : JSON.stringify(get.data);
      expect(body).to.not.match(/Error:|Exception|Stack trace/);
    });
  }
});
