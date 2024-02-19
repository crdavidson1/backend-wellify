const app = require('../app');
const request = require('supertest')
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index.js');
const endpointsFile = require('../endpoints.json')

beforeEach(() => seed({ articleData, commentData, topicData, userData }));
afterAll(() => db.end());

describe('General request errors', () => {
    test('Request to an invalid endpoint receives a 404 error', () => {
        return request(app)
        .get('/api/forklift')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not found')
        })
    })
})
describe('/api/topics', () => {
    test('GET:200 sends an array of topic objects to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3)
            response.body.topics.forEach((topic) => {
                expect(typeof topic.slug).toBe('string')
                expect(typeof topic.description).toBe('string')
            })
        })
    })
})
describe('/api', () => {
    test.only('GET:200 provides a description of all other endpoints available which matches the endpoints.json file', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const endpointDescriptions = response.body
            expect(endpointDescriptions).toEqual(endpointsFile)
            Object.values(endpointDescriptions).forEach((endpoint) => {
                console.log(endpoint)
                if (endpoint.description) expect(typeof endpoint.description).toBe('string')
                if (endpoint.queries) expect(typeof endpoint.queries).toBe('object')
                if (endpoint.exampleResponse) expect(typeof endpoint.exampleResponse).toBe('object')
                if (endpoint.bodyFormat) expect(typeof endpoint.bodyFormat).toBe('string')
            })
        })
    })
})