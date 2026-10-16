const express = require('express');
const recipeController =require('../controllers/recipe.controller');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.post('/ingredients', recipeController.createIngredient);
router.post('/:id/ingredients', recipeController.addIngredientToRecipe);

module.exports = router;