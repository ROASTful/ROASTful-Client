'use strict';

$('.icon-menu').click(function() {
  $('.main-nav ul').slideToggle();
})

$('.main-nav ul li').click(function() {
  if ($(window).width() < 709) {
    $('.main-nav ul').hide();
  }
})

// resets nav bar after window resize
$(window).resize(function() {
  if ($(window).width() > 709) {
    $('.main-nav ul').fadeIn();
  } else if ($(window).width() < 709) {
    $('.main-nav ul').hide();
  }
})

$('html').click(function() {
  $('#login').slideUp();
});

// prevents click event functionality
$('#login').click(function(event){
    event.stopPropagation();
});
