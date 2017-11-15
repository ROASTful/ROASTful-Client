'use strict'
var app = app || {};


page('/', ctx => app.Ingredient.fetchAll(app.ingredientView.initIndexPage));
page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));
page('/pantry', '/');
page('/recipe', '/');

page('/pantry/:pantryName', app.ingredientController.loadByPantry, app.ingredientController.index);
page('/recipe/:recipeName', app.recipeController.loadByRecipe, app.ingredientController.index);

page();
