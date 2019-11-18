const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if(req.headers.authorization === undefined){
      res.sendStatus(403);
    }
    else{
      req.token = req.headers.authorization.split(' ')[1];
      next();
    }
}

module.exports = {
  verifyToken,
}