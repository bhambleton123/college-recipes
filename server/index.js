const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const recipes = require('./controllers/recipes.js');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

//endpoints for recipes
app.get('/recipes', recipes.getRecipes);
app.post('/recipes/:user_id', recipes.postRecipe);
app.put('/recipes/:user_id', recipes.updateRecipeByUserId);
app.delete('/recipes/:id', recipes.deleteRecipeById);

app.listen(port, () => console.log(`Server listening on ${port}`));