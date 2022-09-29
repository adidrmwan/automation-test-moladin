const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.REQRES_BASE_URL);

const createUser = (name, job) => api.post('api/users')
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .send({ 
    "name": name, 
    "job" : job
 })

const getUserById = (id) => api.get('api/users/'+id)
.set('Content-Type', 'application/json')
.set('Accept', 'application/json')

const getAllUser = (pages) => api.get('api/users')
.set('Content-Type', 'application/json')
.set('Accept', 'application/json')
.query({ page : pages })

module.exports = {
    createUser,
    getUserById,
    getAllUser,
}