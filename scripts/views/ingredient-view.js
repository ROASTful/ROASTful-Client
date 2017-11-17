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
  $('html').off('click');
  $('html').click(function() {
    $('#login').slideUp();
  });
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
  if(!app.User.currentUser){
    page('/user/login');
  }else{
  $('.container').hide();
  $('#recipe-main').show();
  $('#recipe-list').empty();
  $('#recipe-main').empty();
  if(app.User.currentUser.recipes){
  app.User.currentUser.recipes.forEach(recipe =>app.Recipe.retrieveRecipes(recipe))
}
  }
  // app.Recipe.showPantry();
};


module.ingredientView = ingredientView;

})(app);
