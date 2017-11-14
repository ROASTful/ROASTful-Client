'use strict';

var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

function Recipe(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  };

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
    Recipe.builtSearch = Recipe.ingredientSearch.push($('#ingredient').val().replace(/\s+/g, '%20'));
    $('#export-field').show();
    $('#ingredient').val('');
  })

  $('#search-recipes').submit(function (event) {
    event.preventDefault();
    Recipe.builtSearch = Recipe.ingredientSearch.join(',');
    console.log(Recipe.builtSearch);
    Recipe.search(Recipe.builtSearch);
    Recipe.ingredientSearch = [];
  })
}

Recipe.search = ingredients => {
  $.get(`${__API_URL__}/recipes/ingredient/search/${ingredients}`)
    .then(results => {
      Recipe.loadAll(results);
    })
    .catch(err => console.error(err))
}
