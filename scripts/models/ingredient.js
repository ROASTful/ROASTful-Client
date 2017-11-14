'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

function Recipe(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  };

Recipe.all = [];

Recipe.prototype.toHtml = function () {
  let template = Handlebars.compile($('#recipe-template').text())
  return template(this);
}

Recipe.loadAll = rawData => {
  Recipe.all = rawData.map(rawDataObj => new Recipe(rawDataObj))
}

Recipe.search = callback => {
  $.get(``)
  .then(results => {
    Recipe.loadAll(results);
  })
  .then(callback)
  .catch(errorCallback)
}
