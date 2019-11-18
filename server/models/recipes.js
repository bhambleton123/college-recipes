const db = require('../database/index.js');

const getRecipes = (callback) => {
  const queryString = 'SELECT * FROM recipes ORDER BY recipes.id DESC LIMIT 12';
  db.connection.query(queryString, (err, results) => {
    if(err){
      callback(err);
    }
    else{

      callback(null, results);
    }
  })
}

const postRecipe = (userId, title, callback) => {
  db.connection.query('INSERT INTO recipes (title, user_id) VALUES (?,?);', [title, userId], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, results);
    }
  })
}

const updateRecipeByUserId = (userId, title, callback) => {
  db.connection.query('UPDATE recipes SET title=? WHERE user_id=?', [title, userId], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, results);
    }
  })
}

const deleteRecipeById = (id, callback) => {
  db.connection.query('DELETE FROM recipes WHERE id=?', [id], (err, results) => {
    if(err){
      callback(err);
    }
    else{
      callback(null, results);
    }
  })
}

module.exports = {
  getRecipes,
  postRecipe,
  updateRecipeByUserId,
  deleteRecipeById,
}