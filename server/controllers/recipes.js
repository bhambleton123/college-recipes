const models = require("../models/recipes.js");
const utils = require('../utils.js');

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
  models.postRecipe(req.params.user_id, req.body.title, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
};

const updateRecipeByUserId = (req, res) => {
  models.updateRecipeByUserId(
    req.params.user_id,
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
