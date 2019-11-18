require("dotenv").config({path: __dirname + '/../../.env'});
const models = require("../models/recipes.js");
const utils = require("../utils.js");
const jwt = require("jsonwebtoken");

const getRecipes = (req, res) => {
  models.getRecipes((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
};

const postRecipe = (req, res) => {
  const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
  models.postRecipe(decoded.user.id, req.body.title, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
};

const updateRecipeByUserId = (req, res) => {
  const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
  models.updateRecipeByUserId(
    decoded.user.id,
    req.body.title,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const deleteRecipeById = (req, res) => {
  models.deleteRecipeById(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
};
module.exports = {
  getRecipes,
  postRecipe,
  updateRecipeByUserId,
  deleteRecipeById
};
