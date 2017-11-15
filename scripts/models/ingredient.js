'use strict';

var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
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

//passes results through Recipe constructor, emptys the previous results and then calls showRecipes
Recipe.loadAll = rawData => {
  Recipe.all = rawData.map(rawData => new Recipe(rawData));
  $('#recipe-results').empty();
  Recipe.showRecipes();
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
    $('#recipe-results').on('click', 'a.more-recipes', function() {
      $('#recipe-results .recipes').fadeIn();
      $('#recipe-results a.more-recipes').hide();
    })
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
  console.log('shown');
  // $('.recipe-image').hide();
  $('.recipe-ingredients').hide();
  $('#recipe-results').on('click', 'a.show-more', function(event) {
    console.log('clicked');
    console.log(event);
    event.preventDefault();
    if ($(this).text() === 'Show ingredients →') {
      if($(this).data('loaded')){
        
      }
      console.log('do it');
      $(this).parent().find('*').fadeIn();
      $(this).html('Hide ingredients &larr;');
      Recipe.retreiveIngredients($(this).data('recipeid'));
    } else {
      $(this).html('Show ingredients &rarr;');
      // $(this).parent().find('.recipe-image').hide();
      $(this).parent().find('.recipe-ingredients').hide();
    }
  })
  console.log('shown2')
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
