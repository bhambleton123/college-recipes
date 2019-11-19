const db = require('../database/index.js');

const getStepsByRecipeId = (recipeId, callback) => {
  db.connection.query('SELECT * FROM recipe_steps WHERE recipe_id=?', [recipeId], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, results);
    }
  })
}

const insertStepByRecipeId = (recipeId, stepNumber, stepDescription, callback) => {
  db.connection.query('INSERT INTO recipe_steps (step_number, step_description, recipe_id) VALUES(?,?,?);',
    [stepNumber, stepDescription, recipeId],
    (err, results) => {
      if(err){
        callback(err);
      }
      else{
        callback(null, results);
      }
    })
}

const updateRecipeStepById = (recipeId, stepNumber, stepDescription, callback) => {
  db.connection.query('UPDATE recipe_steps SET step_description=? WHERE recipe_id=? AND step_number=?',
    [stepDescription, recipeId, stepNumber],
    (err, results) => {
      if(err){
        callback(err);
      }
      else{
        callback(null, err);
      }
    })
}

const deleteRecipeStepById = (recipeId, stepNumber, callback) => {
  db.connection.query('DELETE FROM recipe_steps WHERE recipe_id=? AND step_number=?', [recipeId, stepNumber], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, err);
    }
  })
}

const deleteRecipeStepsById = (recipeId, callback) => {
  db.connection.query('DELETE FROM recipe_steps WHERE recipe_id=?;', [recipeId], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, err);
    }
  })
}

module.exports = {
  getStepsByRecipeId,
  insertStepByRecipeId,
  updateRecipeStepById,
  deleteRecipeStepById,
  deleteRecipeStepsById,
}