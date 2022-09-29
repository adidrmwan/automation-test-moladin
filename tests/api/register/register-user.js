const assert = require('chai').expect;

const page = require('../../../pages/api/Register');

const testCase = {
  "positive" : {
    "registerUser" : "As a User, I want to be able to register user",
  },
  "negative" : {
    "noEmail" : "As a User, I should got error 400 when I send request without email",
    "invalidEmail" : "As a User, I should got error 400 when I send request with invalid Email",
    "noPassword" : "As a User, I should got error 400 when I send request without Password",
    "notDefinedUser" : "As a User, I should got error 400 when I send request with not defined user"
 }
}

describe(`Register User`, () => {
  const email = "eve.holt@reqres.in";
  const invalidEmail = "eve";
  const notDefinedUser = "awan@reqres.in";
  const password = "pistol";
 
    it(`@post ${testCase.positive.registerUser}`, async() => {
    const response = await page.registerUser(email, password);
    assert(response.status).to.equal(200);
    assert(response.body.id).to.equal(4);
    }),

    it(`@post ${testCase.negative.noEmail}`, async() => {
        const response = await page.registerUser(null, password);
        assert(response.status).to.equal(400);
    }),

    it(`@post ${testCase.negative.invalidEmail}`, async() => {
    const response = await page.registerUser(invalidEmail, password);
    assert(response.status).to.equal(400);
    }),

    it(`@post ${testCase.negative.noPassword}`, async() => {
        const response = await page.registerUser(email, null);
        assert(response.status).to.equal(400);
    }),

    it(`@post ${testCase.negative.notDefinedUser}`, async() => {
        const response = await page.registerUser(notDefinedUser, password);
        assert(response.status).to.equal(400);
        assert(response.body.error).to.equal("Note: Only defined users succeed registration");
    })


}) 