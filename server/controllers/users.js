require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../models/users.js');

//post
const signin = (req, res) => {
  models.signin(req.body.name, req.body.password, (err, results) => {
    if(results.correct){
      const user = {id: results.id, name: results.name};
      //sign json web token
      const token = jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn:'1h'});
      res.send(token);
    }
    else if(err){
        res.status(500).send(results);
      }
      else{
        res.status(401).send(results);
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