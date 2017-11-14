'use strict';
var app = app || {};

var recipe = {"recipe":
{"publisher": "Two Peas and Their Pod",
"f2f_url": "http://food2fork.com/view/54384",
"ingredients": ["10 ounces dry elbow macaroni", "2 cloves garlic, minced", "2 avocados, peeled and pitted", "2 tablespoons fresh lime juice", "1/3 cup chopped fresh cilantro", "Salt and pepper, to taste", "2 tablespoons butter", "2 tablespoons all-purpose flour", "1 cup milk", "2 cups shredded Pepper Jack cheese", "Salt and pepper, to taste", "Fresh avocado chunks, for garnish, if desired"],
"source_url": "http://www.twopeasandtheirpod.com/stovetop-avocado-mac-and-cheese/",
"recipe_id": "54384",
"image_url": "http://static.food2fork.com/avocadomacandcheesedc99.jpg",
"social_rank": 100.0,
"publisher_url": "http://www.twopeasandtheirpod.com",
"title": "Stovetop Avocado Mac and Cheese"}
};

let template = Handlebars.compile($('#recipe-template').html());

$('#recipe-results').append(template(recipe));
