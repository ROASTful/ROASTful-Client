'use strict'
var app = app || {};


page('/', app.ingredientView.initIndexPage);
page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));
page('/user/about', app.ingredientView.initAboutPage);
page('/user/recipes', app.ingredientView.initRecipePage);
page('/user/pantry', app.ingredientView.initPantryPage);
page('/user/login', app.ingredientView.initLoginPage);

page();
