const models = require('../models/recipeSteps.js');

const getStepsByRecipeId = (req, res) => {
  models.getStepsByRecipeId(req.params.recipe_id, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(results);
    }
  })
}

const insertStepByRecipeId = (req, res) => {
  models.insertStepByRecipeId(req.params.recipe_id, req.params.step_number, req.body.description, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(results);
    }
  })
}

const updateRecipeStepById = (req, res) => {
  models.updateRecipeStepById(req.params.recipe_id, req.params.step_number, req.body.description, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(results);
    }
  })
}

const deleteRecipeStepById = (req, res) => {
  models.deleteRecipeStepById(req.params.recipe_id, req.params.step_number, (err, results) => {
    if(err){
      res.status(500).send(err);
    }
    else{
      res.send(results);
    }
  })
}

module.exports = {
  getStepsByRecipeId,
  insertStepByRecipeId,
  updateRecipeStepById,
  deleteRecipeStepById,
}