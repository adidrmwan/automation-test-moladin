const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.REQRES_BASE_URL);

const registerUser = (email, password) => api.post('api/register')
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .send({ 
    "email": email, 
    "password" : password
 })

module.exports = {
    registerUser,
}