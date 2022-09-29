const assert = require('chai').expect;

const page = require('../../../pages/api/User');

const testCase = {
  "positive" : {
    "getAllUser" : "As a User, I want to be able to get all user based on page",
  }
}

describe(`Get All User Based On Page`, () => {
    const pages = 1;
    const invalidPage = "satu";
 
    it(`@get ${testCase.positive.getAllUser}`, async() => {
    const response = await page.getAllUser(pages);
    assert(response.status).to.equal(200);
    assert(response.body.page).to.equal(pages);
    })
}) 