const axios = require('axios');
const { expect } = require('chai');

describe('Database (in-memory) Tests (10)', function() {
  this.timeout(30000);
  const base = process.env.BASE_URL || 'http://localhost:3002';

  it('DB - clear all captures (DELETE)', async function() {
    const res = await axios.delete(`${base}/api/captures`);
    expect(res.status).to.equal(200);
  });

  for (let i = 1; i <= 9; i++) {
    it(`DB - add and fetch record #${i}`, async function() {
      const item = {
        id: `dbtest-${Date.now()}-${i}`,
        hexId: `${i}`,
        imageUrl: 'data:image/jpeg;base64,TEST',
        locationName: 'DB Test',
        latitude: 1.1 + i,
        longitude: 2.2 + i,
        accuracy: 10,
        timestamp: new Date().toISOString(),
        hash: 'hash',
        status: 'VERIFIED',
        confidence: 90,
        deviceInfo: 'DB Test'
      };
      const post = await axios.post(`${base}/api/captures`, item);
      expect(post.status).to.be.oneOf([200,201]);
      const all = await axios.get(`${base}/api/captures`);
      expect(Array.isArray(all.data)).to.be.true;
      const found = all.data.find(x => x.id === item.id);
      expect(found).to.exist;
    });
  }
});
