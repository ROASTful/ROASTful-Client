'use strict';

$('#login button').click(function(e) {
  if ($('#username').val().length > 20 || $('#username').val().length <= 0) {
    console.log('invalid username');
    return;
  }
  if ($('#password').val().length < 4 || $('#password').val().length > 16) {
    console.log('invalid password');
    return;
  }
  console.log('login complete');
})
