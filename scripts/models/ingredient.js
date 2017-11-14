'use strict';

var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

function Recipe(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}

Recipe.all = [];
Recipe.ingredientSearch = [];
Recipe.builtSearch;

Recipe.prototype.toHtml = function () {
  let template = Handlebars.compile($('#recipe-template').text())
  return template(this);
}

Recipe.loadAll = rawData => {
  Recipe.all = rawData.map(rawDataObj => new Recipe(rawDataObj))
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

Recipe.search = ingredients => {
  $.get(`${__API_URL__}/recipes/${ingredients}`)
    .then(results => {
      console.log(`${ingredients}`);
      console.log(JSON.parse(results).recipes);
      Recipe.loadAll(JSON.parse(results).recipes);
    })
    .catch(err => console.error(err))
}

$(document).ready(() => {
  Recipe.buildSearch();
})
