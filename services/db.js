
const mongo = require('../plugins/mongodb')

function testDb() {
  console.log("testDB")
  mongo.run();
}

module.exports = {
  testDb
}