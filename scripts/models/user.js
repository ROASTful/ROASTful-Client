'use strict';

var app = app || {};
var __API_URL__ = 'https://roastful.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

function User(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
}

User.update= (user) => {
  $.ajax({
    url: `${__API_URL__}/api/v1/users/${user.username}`,
    method: 'PUT',
    data: user
  })
    .then(() => {console.log('updated'); page('/')})
    .catch(errorCallback);
};
