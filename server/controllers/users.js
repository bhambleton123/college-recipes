const models = require('../models/users.js');

const signin = (req, res) => {
  models.signin(req.body.name, req.body.password, (err, results) => {
    if(err){
      res.status(401).send(err);
    }
    else{
      results ? res.send(results) : res.status(401).send(results);
    }
  })
}

//post
const signup = (req, res) => {
  models.signup(req.body.name, req.body.password, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(results);
    }
  })
}

module.exports = {
  signin,
  signup,
}