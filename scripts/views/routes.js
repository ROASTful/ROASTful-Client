'use strict'

// page('/', ctx => app.Ingredient.fetchAll(app.bookView.initIndexPage));

page('/ingredient/error', ctx => app.ingredientView.errorCallback(ctx));

page();
