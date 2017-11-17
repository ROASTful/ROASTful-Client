'use strict';
var app = app || {};

(function(module) {

  const ingredientView = {};

  const render = function(recipe) {
    let template = Handlebars.compile($('#recipe-template').html());
    recipe.body = marked(recipe.body);
    return template(recipe);
  };

ingredientView.initIndexPage=() => {
  $('#recipe-results').off('click');
  $('.recipes').off('click');
  $('#addIngredient').off('click');
  $('#search-recipes').off('submit');
  $('.container').hide();
  $('#search-main').show();
  $('#recipe-results').show();
  $('#about-us').hide();
  app.Recipe.showIngredients();
  app.Recipe.buildSearch();
  app.Recipe.addToMyRecipes();
};

ingredientView.initLoginPage=() => {
  let $login = $('a[href="/user/login"]');
  let $loginText = $login.text();

  if (/^logout/.test($loginText)) {
    localStorage.clear();
    app.User.currentUser = null;
    $login.text(' Login/Register');
  } else {
  $('#login').slideDown();
  }
};

ingredientView.initAboutPage=() => {
  $('.container').hide();
  $('#about-us').show();
};

ingredientView.initRecipePage=() => {
  $('.container').hide();
  $('#recipe-main').show();
  $('#recipe-list').empty();
  if(app.User.currentUser.recipes){
    console.log('recipes is is', app.User.currentUser.recipes);
  app.User.currentUser.recipes.forEach(recipe =>app.Recipe.retrieveRecipes(recipe))
  }
  // app.Recipe.showPantry();
};

var recipe = [];

let myRecipies = Handlebars.compile($('#my-recipe-template').html());
//  We can add this block if or when we add filters
// ingredientView.populateFilters = function() {
//     let template = Handlebars.compile($('#recipe-template').text());
//     let options = app.Recipe.allRecipes().map(recipe => template({val: recipe}));
//     if ($('#recipe-filter option').length < 2) {
//       $('#recipe-filter').append(options);
//     }
//
//     app.Recipe.allCategories(function(rows) {
//       if ($('#recipe-filter option').length < 2) {
//         $('#recipe-filter').append(rows.map(row => template({val: row.recipe})));
//       }
//     });
//   };

  $('#recipe-list').append(myRecipies(recipe));

module.ingredientView = ingredientView;

})(app);
