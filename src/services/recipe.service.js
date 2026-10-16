const prisma = require('../lib/prisma');

async function getAllRecipes() {
  const recipes = await prisma.recipe.findMany(
    {
        include:{
            recipe_ingredient:{
                include:{ingredient :true , },
            },
        },
    }
  );
  return recipes;
}
async function createRecipe(data) {
    return prisma.recipe.create({
        data:{
            name:data.name,
            description:data.description,
            prep_time:data.prep_time,
            cook_time:data.cook_time,

        },
    });
    
}

async function getRecipeById(id) {
  return prisma.recipe.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      recipe_ingredient: {
        include: {
          ingredient: true,
        },
      },
    },
  });
}

async function createIngredient(data) {
  return prisma.ingredient.create({
    data: {
      name: data.name,
    },
  });
}

async function addIngredientToRecipe(recipeId, data) {
  const recipeIngredient = await prisma.recipe_ingredient.create({
    data: {
      recipe_id: Number(recipeId),
      ingredient_id: data.ingredient_id,
      quantity: data.quantity,
      unit: data.unit,
    },
    include: {
      ingredient: true,
    },
  });

  return recipeIngredient;
}

module.exports = { 
    getAllRecipes,
    createRecipe,
    getRecipeById,
    createIngredient,
    addIngredientToRecipe,
};