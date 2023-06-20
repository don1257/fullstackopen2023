const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('api call is getting a 200', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('notes are returned as json', async () => {
    const result = await api.get('/api/blogs')
    const data = result.body
    expect(data).toBeDefined()
})

test('post api call test', async () => {
    const body = {
        "title": "String",
        "author": "String",
        "url": "String",
        "likes": 0
    }

    const responseGet = await api.get('/api/blogs')
    const currentLength = responseGet.body.length

    const response = await api.post('/api/blogs').send(body)
    expect(response.statusCode).toBe(201)

    const responseBody = response.body
    expect(responseBody).toBeDefined()
    expect(responseBody.title).toBe(body.title)
    expect(responseBody.author). toBe(body.author)
    expect(responseBody.url).toBe(body.url)

    const responseGetEnd = await api.get('/api/blogs')
    const currentGetEnd = responseGetEnd.body.length
    expect(currentGetEnd).toEqual(currentLength + 1)
})

afterAll(async () => {
    await mongoose.connection.close()
})
