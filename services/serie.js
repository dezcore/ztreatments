//const helper = require('../helper')
//const config = require('../config')
//const google = require('./../plugins/youtube')

function getSeries(req, res) {
  if(req && res) {
    res.end('Hello World');
  }
}

function postUserResponse(req, res) {
  if(req && res) {
    res.json({"file" : "Hello world !"})
  }
}

function create(){ 
  return {"message": "Hello world !"}
}

function update(){
 return {"message": "Hello world !"}
}

function removeFolder(req, res) {
  res.json({"delete" : "Hello world !"})
}

module.exports = {
  create,
  update,
  getSeries,
  removeFolder,
  postUserResponse
}