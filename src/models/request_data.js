const connectDB = require('../db');
const request = require('./request');

async function getRequests() {
  await connectDB();
  const allRequests = await request.find();
  // console.log(allRequests);
  return allRequests;
}

module.exports = getRequests;
