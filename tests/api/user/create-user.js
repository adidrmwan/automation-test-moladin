const assert = require('chai').expect;

const page = require('../../../pages/api/User');

const testCase = {
  "positive" : {
    "createUser" : "As a User, I want to be able to create a new user",
  }
}

describe(`Create New User`, () => {
  const name = "awan";
  const job = "leader";
 
  it(`@post ${testCase.positive.createUser}`, async() => {
   const response = await page.createUser(name, job);
   assert(response.status).to.equal(201);
   assert(response.body.name).to.equal(name);
   assert(response.body.job).to.equal(job);
  })
}) 