const axios = require('axios');
const { expect } = require('chai');

describe('API Tests (15)', function() {
  this.timeout(30000);

  const base = process.env.API_URL || (process.env.BASE_URL || 'http://localhost:3002');

  it('API - GET /api/captures should return array', async function() {
    const res = await axios.get(`${base}/api/captures`);
    expect(res.status).to.equal(200);
    expect(Array.isArray(res.data)).to.be.true;
  });

  for (let i = 1; i <= 14; i++) {
    it(`API - POST/GET flow #${i}`, async function() {
      const item = {
        id: `test-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        hexId: (Math.random()*0xffff|0).toString(16).toUpperCase().slice(0,4),
        imageUrl: 'data:image/jpeg;base64,TEST',
        locationName: 'Test Location',
        latitude: 12.34,
        longitude: 56.78,
        accuracy: 5,
        timestamp: new Date().toISOString(),
        hash: 'abc123',
        status: 'VERIFIED',
        confidence: 99,
        deviceInfo: 'Selenium Test'
      };
      const post = await axios.post(`${base}/api/captures`, item);
      expect(post.status).to.be.oneOf([200,201]);
      const get = await axios.get(`${base}/api/captures/${item.id}`);
      expect(get.status).to.equal(200);
      expect(get.data.id).to.equal(item.id);
    });
  }
});
