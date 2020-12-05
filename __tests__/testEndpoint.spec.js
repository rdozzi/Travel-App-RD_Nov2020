const app = require('../src/server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Test Endpoint Response', () => {
    test('Obtain 200 server response from call', async () => {
        
        const response = await request.get('/getGeonames');
        expect(response.status).toBe(200);
    })
})