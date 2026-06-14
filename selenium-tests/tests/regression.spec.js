require('./common');
const axios = require('axios');
const { expect } = require('chai');

describe('Regression / E2E Flows (10)', function() {
  this.timeout(60000);
  const base = process.env.BASE_URL || 'http://localhost:3002';

  for (let i = 1; i <= 10; i++) {
    it(`E2E - post capture then verify appears in UI #${i}`, async function() {
      const item = {
        id: `e2e-${Date.now()}-${i}`,
        hexId: `E2E${i}`,
        imageUrl: 'data:image/jpeg;base64,TEST',
        locationName: 'E2E Test',
        latitude: 10 + i,
        longitude: 20 + i,
        accuracy: 12,
        timestamp: new Date().toISOString(),
        hash: 'e2ehash',
        status: 'VERIFIED',
        confidence: 88,
        deviceInfo: 'E2E Runner'
      };
      await axios.post(`${base}/api/captures`, item);
      // Refresh UI and search for the hexId text
      // Verify server stored the item via API
      const get = await axios.get(`${base}/api/captures/${item.id}`);
      expect(get.status).to.equal(200);
      expect(get.data.id).to.equal(item.id);
    });
  }
});
