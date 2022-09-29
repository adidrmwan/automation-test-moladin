const assert = require('chai').expect;

const page = require('../../../pages/api/User');

const testCase = {
  "positive" : {
    "getUserById" : "As a User, I want to be able to get user By id",
  },
  "negative" : {
     "noId" : "As a User, I should got error 404 when I send request without id",
     "invalidId" : "As a User, I should got error 404 when I send request with invalid ID"
  }
}

describe(`Get User By ID`, () => {
    const id = 1;
    const invalidId = "satu";
 
    it(`@get ${testCase.positive.getUserById}`, async() => {
    const response = await page.getUserById(id);
    assert(response.status).to.equal(200);
    assert(response.body.data.id).to.equal(id);
    }),

    it(`@get ${testCase.negative.noId}`, async() => {
        const response = await page.getUserById(null);
        assert(response.status).to.equal(404);
    }),

    it(`@get ${testCase.negative.invalidId}`, async() => {
    const response = await page.getUserById(invalidId);
    assert(response.status).to.equal(404);
    })
}) 