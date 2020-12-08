// Information provided from: https://zellwk.com/blog/endpoint-testing/

import 'regenerator-runtime/runtime'

const app = require('../src/server/server.js');
const supertest = require('supertest');
const request = supertest(app);

// Example from URL above to check if this is working
describe('Test functionality per web example', () => {
    test('Gets the test endpoint', async done => {
        const res = await request.get('/test')

        expect(res.status).toBe(200)
        expect(res.body.message).toBe('pass!')
        done()
    })
})

// Test an endpoint response from my build
describe('Test Endpoint Response 1', () => {
    test('Obtain 200 server response from call', async done => {
        
        const response = await request.get('/');
        expect(response.status).toBe(200);
        done();
    })
})