const db = require('../database/index.js');
const bcrypt = require('bcrypt');

const signin = (name, password, callback) => {
  db.connection.query('SELECT id, password, user_name FROM users WHERE user_name=?', [name], (err, results) => {
    bcrypt.compare(password, results[0].password, (error, response) => {
      if(error){
        callback(error);
      }
      else{
        results = {id: results[0].id, correct: response, name: results[0].user_name};
        callback(null, results);
      }
    })
  })
}

const signup = (name, password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if(err){
      callback(err);
    }
    else{
      db.connection.query('INSERT INTO users (user_name, password) VALUES(?,?);', [name, hash], (err, results) => {
        if(err){
          callback(err);
        }
        else{
          callback(null, results);
        }
      })
    }
  })
}

module.exports = {
  signin,
  signup,
}