const jwt = require('jsonwebtoken');
const models = require('../models/users.js');

//post
const signin = (req, res) => {
  models.signin(req.body.name, req.body.password, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      if(results){
        const user = {name: req.body.name}
        res.cookie("userData", user);
        res.send([results, req.cookies]);
      }
      else{
        res.status(401).send(results);
      }
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