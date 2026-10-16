const recipeService = require('../services/recipe.service');

async function getAllRecipes(req, res) {
  try {
    const recipes = await recipeService.getAllRecipes();

    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'فشل السيرفر باحضار الوصفاات ',
    });
  }
}


async function createRecipe(req,res) {
    try{ 
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json({
        success:true,
        data:recipe,
    });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:'فشل بانشاااء الوصفة ',
        });
    }
}


async function getRecipeById(req, res) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'الوصفة غير موجودة',
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'فشل بجلب الوصفة المحددة',
    });
  }
}



async function createIngredient(req, res) {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'اسم المكون مطلووب',
      });
    }

    const ingredient = await recipeService.createIngredient({
      name: name.trim(),
    });

    return res.status(201).json({
      success: true,
      data: ingredient,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'المكوون موجود مسبقا',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'فشل بانشااء المكون',
    });
  }
}


async function addIngredientToRecipe(req, res) {
  try {
    const { id } = req.params;
    const { ingredient_id, quantity, unit } = req.body;

    if (
      !Number.isInteger(Number(id)) ||
      Number(id) <= 0 ||
      !Number.isInteger(ingredient_id) ||
      ingredient_id <= 0 ||
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      typeof unit !== 'string' ||
      !unit.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'بيانات ارسال خاطئة',
      });
    }

    const recipeIngredient =
      await recipeService.addIngredientToRecipe(id, {
        ingredient_id,
        quantity,
        unit: unit.trim(),
      });

    return res.status(201).json({
      success: true,
      data: recipeIngredient,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2003') {
      return res.status(404).json({
        success: false,
        message: 'الوصفة او المكون غير موجودين',
      });
    }

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'المكون مضاف مسبقا الى الوصفة ',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'فشل باضافة المنتج للوصفة',
    });
  }
}

module.exports = {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    createIngredient,
    addIngredientToRecipe,
};