const { MongoClient } = require("mongodb");
//Replace the uri string with your connection string.
const uri = 'mongodb://root:secret@mongodb'
const client = new MongoClient(uri);
// Database Name
const dbName = 'maboke';

async function run() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const database = client.db(dbName);
    const channels = database.collection('channel');
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const channel = await channels.find(query).toArray();
    console.log(channel);
  } catch {
    console.error
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
    run
}