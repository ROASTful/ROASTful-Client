'use strict'
var app = app || {};


page('/', app.ingredientView.initIndexPage);
page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));
page('/user/about', app.ingredientView.initAboutPage);
page('/user/recipes', app.ingredientView.initRecipePage);
page('/user/login', app.ingredientView.initLoginPage);


// page('/recipe', '/');
//
// page('/pantry/:pantryName', app.ingredientController.loadByPantry, app.ingredientController.index);
// page('/recipe/:recipeName', app.recipeController.loadByRecipe, app.ingredientController.index);

page();
