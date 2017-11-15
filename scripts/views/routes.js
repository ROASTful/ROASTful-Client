'use strict'
var app = app || {};


page('/', ctx => app.ingredientView.initIndexPage);
page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));
page('/user/pantry', app.ingredientView.initPantryPage);
page('/user/recipes', app.ingredientView.initRecipePage);
// page('/recipe', '/');
//
// page('/pantry/:pantryName', app.ingredientController.loadByPantry, app.ingredientController.index);
// page('/recipe/:recipeName', app.recipeController.loadByRecipe, app.ingredientController.index);

page();
