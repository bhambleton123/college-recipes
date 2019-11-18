const recipes = require('../models/recipes.js');
const recipeSteps = require('../models/recipeSteps.js');
const faker = require('faker');

for(let i=1; i<=100; i++){
  const randomUser = Math.round(Math.random()*3 + 1);

  recipes.postRecipe(randomUser, faker.lorem.words(), (err, results) => {
    if(err){
      console.log(err)
    }
    else{
      console.log(results);
    }
  })

  for(let j=1; j<Math.round(Math.random()*5+1); j++){
    recipeSteps.insertStepByRecipeId(i, j, faker.lorem.sentence(), (err, results) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(results);
      }
    })
  }
}
