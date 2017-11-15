'use strict';

var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
// var userName = JSON.parse(localStorage.user) || false;
// var __API_URL__ = 'http://localhost:3000';

function Recipe(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}

function Details(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}

Recipe.all = [];
Recipe.ingredientSearch = [];
Recipe.builtSearch;
Recipe.ingredientsByRecipe = [];

Recipe.prototype.toHtml = function () {
  let template = Handlebars.compile($('#recipe-template').text())
  return template(this);
}

Recipe.loadAll = rawData => {
  Recipe.all = rawData.map(rawData => new Recipe(rawData))
}

Recipe.loadAllIngredients = rawData => {
  rawData.ingredients.forEach((eachList) => $(`.recipe-ingredients[data-recipeid="${rawData.recipe_id}"]`).append(`<li>${eachList}</li>`))
}

Recipe.buildSearch = () => {
  $('#addIngredient').click(function(event) {
    event.preventDefault();
    Recipe.ingredientSearch.push($('#ingredient').val().replace(/\s+/g, '%20'));
    $('#export-field').show();
    $('#full-ingredient-search').val(Recipe.ingredientSearch.join(','));
    $('#ingredient').val('');
  })

  $('#search-recipes').submit(function (event) {
    event.preventDefault();
    Recipe.builtSearch = Recipe.ingredientSearch.join(',');
    Recipe.ingredientSearch = [];
    Recipe.search(Recipe.builtSearch);
  })
}

Recipe.showIngredients = () => {
  $('.recipe-image').hide();
  $('.recipe-ingredients').hide();
  $('.recipes').on('click', 'a.show-more', function(event) {
    event.preventDefault();
    if ($(this).text() === 'Show ingredients →') {
      if (!$(this).data('loaded')){
        Recipe.retreiveIngredients($(this).data('recipeid'))
        $(this).data('loaded', true);
      }
      $(this).parent().find('*').fadeIn();
      $(this).html('Hide ingredients &larr;');
    } else {
      $(this).html('Show ingredients &rarr;');
      $(this).parent().find('.recipe-image').hide();
      $(this).parent().find('.recipe-ingredients').hide();
    }
  })
}

Recipe.addToMyRecipes = () => {
  $('.recipes').on('click', 'a.save-recipe', function(event) {
    event.preventDefault();
    Recipe.sendToMyRecipes($(this).data('recipeid'))
})
}


Recipe.search = ingredients => {
  $.get(`${__API_URL__}/recipes/search/${ingredients}`)
    .then(results => {
      Recipe.loadAll(JSON.parse(results).recipes);
    })
    .catch(err => console.error(err))
}

Recipe.retreiveIngredients = (recipeid) => {
  $.get(`${__API_URL__}/recipes/ingredient/${recipeid}`)
    .then(results => {
      console.log(JSON.parse(results).recipe);
      Recipe.loadAllIngredients(JSON.parse(results).recipe);
    })
    .catch(err => console.error(err))
}

Recipe.sendToMyRecipes = (recipeid) => {
  $.ajax({
    url: `${__API_URL__}/v1/users/sno`,
    method: 'PUT',
    data: {recipes: recipeid},
    success: function() {
      console.log(recipeid),
      page('/')
    }
  })
}
