const models = require('../models/users.js');

//post
const signin = (req, res) => {
  models.signin(req.body.name, req.body.password, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      if(results){
        // res.cookie("username": req.body.name)
        res.send(results);
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