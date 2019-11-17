const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const utils = require('./utils.js');

//controllers
const recipes = require('./controllers/recipes.js');
const recipeSteps = require('./controllers/recipeSteps.js');
const user = require('./controllers/users.js');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

//endpoints for recipes
app.get('/recipes', recipes.getRecipes);
app.post('/recipes', utils.verifyToken, recipes.postRecipe);
app.put('/recipes/', utils.verifyToken, recipes.updateRecipeByUserId);
app.delete('/recipes/:id', utils.verifyToken, recipes.deleteRecipeById);

//endpoints for recipe steps
app.get('/recipes/:recipe_id/steps', recipeSteps.getStepsByRecipeId);
app.post('/recipes/:recipe_id/step/:step_number', recipeSteps.insertStepByRecipeId);
app.put('/recipes/:recipe_id/step/:step_number', recipeSteps.updateRecipeStepById);
app.delete('/recipes/:recipe_id/step/:step_number', recipeSteps.deleteRecipeStepById);

//endpoints for user
app.post('/signup', user.signup);
app.post('/signin', user.signin);

app.listen(port, () => console.log(`Server listening on ${port}`));