'use strict'
var app = app || {};


page('/', app.ingredientView.initIndexPage);
page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));
page('/user/pantry', app.ingredientView.initPantryPage);
page('/user/recipes', app.ingredientView.initRecipePage);
page('/user/login', app.ingredientView.initLoginPage);

page();
