'use strict';
//TODO: put feedback in if you click save-recipe
//TODO: only show search after clicking add
var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

(function (module) {

function Recipe(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}

Recipe.lastRecipeSaved;

Recipe.all = [];
Recipe.ingredientSearch = [];
Recipe.builtSearch;
Recipe.ingredientsByRecipe = [];

Recipe.prototype.toHtml = function () {
  let template = Handlebars.compile($('#recipe-template').text())
  return template(this);
}

//passes results through Recipe constructor, emptys the previous results and then calls showRecipes
Recipe.loadAll = rawData => {
  Recipe.all = rawData.map(rawData => new Recipe(rawData));
  $('#recipe-results').empty();
  Recipe.showRecipes();
  $('.recipe-ingredients').hide();
  $('.recipes h2').hide();
}

//shows first five results and adds show more buttons
Recipe.showRecipes = () => {
  Recipe.all.forEach(
    function(foobar) {
      let template = Handlebars.compile($('#recipe-template').html());
      $('#recipe-results').append(template(foobar));
    })
  $('#recipe-results .recipes:nth-of-type(n+6)').hide();
  $('#recipe-results').append('<a class="more-recipes">Show more recipes &rarr;</a>')
  $('a.save-recipe').hide();
  $('#recipe-results').on('click', 'a.more-recipes', function() {
    $('#recipe-results .recipes').fadeIn();
    $('#recipe-results a.more-recipes').hide();
  })
}

Recipe.loadAllIngredients = rawData => {
  rawData.ingredients.forEach((eachList) => $(`.recipe-ingredients[data-recipeid="${rawData.recipe_id}"]`).append(`<li>${eachList}</li>`))
}

Recipe.buildSearch = () => {
  $('#submitIngredients').hide();
  $('#addIngredient').click(function(event) {
    event.preventDefault();
    Recipe.ingredientSearch.push($('#ingredient').val().replace(/\s+/g, '%20'));
    $('#export-field').show();
    $('#full-ingredient-search').val(Recipe.ingredientSearch.join(','));
    $('#ingredient').val('');
    $('#submitIngredients').show();
    $('#getLucky').hide();
  })

  $('#search-recipes').submit(function (event) {
    event.preventDefault();
    $('#recipe-results').empty();
    $('#full-ingredient-search').val('');
    app.ingredientView.initIndexPage();
    Recipe.builtSearch = Recipe.ingredientSearch.join(',');
    Recipe.ingredientSearch = [];
    Recipe.search(Recipe.builtSearch);
    $('#getLucky').show();
  })
}

Recipe.showIngredients = () => {
  $('.recipe-ingredients').hide();
  $('.recipes h2').hide();
  $('#recipe-results').on('click', 'a.show-more', function(event)
   {
    event.preventDefault();
    if ($(this).text() === 'Show ingredients →') {
      if (!$(this).data('loaded')){
        Recipe.retrieveIngredients($(this).data('recipeid'))
        $(this).data('loaded', true);
      }

      $(this).parent().find('*').fadeIn();
      $(this).html('Hide ingredients &larr;');
    } else {
      $(this).html('Show ingredients &rarr;');
      $(this).parent().find('.recipe-ingredients').hide();
    }
  })
}

Recipe.addToMyRecipes = () => {
  let $loginText = $('a[href="/user/login"]').text();
  $('#recipe-results').on('click', 'a.save-recipe', function(event) {
    event.preventDefault();

    // true if logged in
    if (/^logout/.test($loginText)) {
      let recipeId = $(this).data('recipeid')
      if (!app.User.currentUser.recipes) {
        app.User.currentUser.recipes = [];
      }
      if (app.User.currentUser.recipes.includes(recipeId)) {
        $(this).text('already saved');
      } else {
        $(this).text('recipe saved');
        app.User.currentUser.recipes.push(recipeId)
        let recipeObj = new Recipe(Recipe.lastRecipeSaved);
        Recipe.sendToMyRecipes(JSON.stringify(app.User.currentUser.recipes))
        Recipe.saveToDatabase(recipeId, recipeObj);
      }
    } else {
      $('#login').slideDown();
      $(this).text('not logged in');
    }
  })
}

Recipe.search = ingredients => {
  $.get(`${__API_URL__}/recipes/search/${ingredients}`)
    .then(results => {
      Recipe.loadAll(JSON.parse(results).recipes);
    })
    .catch(err => console.error(err))
}

Recipe.retrieveIngredients = (recipeid) => {
  $.get(`${__API_URL__}/recipes/ingredient/${recipeid}`)
    .then(results => {
      Recipe.lastRecipeSaved = JSON.parse(results).recipe;
      Recipe.loadAllIngredients(JSON.parse(results).recipe);
    })
    .catch(err => console.error(err))
}

Recipe.retrieveRecipes = (recipeid) => {
  $.get(`${__API_URL__}/db/recipes/${recipeid}`)
    .then(results => {
      if(results){
      results.ingredients = JSON.parse(results.ingredients);
      let template = Handlebars.compile($('#my-recipe-template').html());
      $('#recipe-main').append(template(results));
    }
    })
    .catch(err => console.error(err))
}

Recipe.sendToMyRecipes = (allRecipes) => {
  $.ajax({
    url: `${__API_URL__}/v1/users/${app.User.currentUser.user_id}`,
    method: 'PUT',
    data: {recipes: allRecipes}
  })
}
Recipe.saveToDatabase = (recipeId, recipeObj) => {
  $.ajax({
    url: `${__API_URL__}/db/recipes/${recipeId}`,
    method: 'POST',
    data: recipeObj
  })
}

module.Recipe = Recipe;

})(app);
