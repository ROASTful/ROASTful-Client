'use strict';

var __API_URL__ = 'https://roastful.herokuapp.com';


// login validation
$('#login button').click(function(e) {
  let $userValidation = $('#userPop');
  let $passValidation = $('#passwordPop');
  let username = $('#username').val();
  let password = $('#password').val();
  console.log('login test');

  login.clear();

  // =========== USERNAME VALIDATION ===========
  if (username.length <= 0) {
    // console.log('requires username');
    $('#userPop').css('padding-bottom', '1vw');
    $userValidation.text('requires username');
    return;
  }
  if (/[\W]/.test(username)) {
    // must contain [a-zA-Z0-9_]
    $('#userPop').css('padding-bottom', '1vw');
    $userValidation.text(`username can only include 'a-z', '0-9', and '_'`);
    return;
  }
  // =========== PASSWORD VALIDATION ===========
  if (password.length < 4) {
    $passValidation.text('password length must be minimum of 4 characters');
    return;
  }
  if (/[\W]/.test(password)) {
    // must contain [a-zA-Z0-9_]
    $passValidation.text(`username can only include 'a-z', '0-9', and '_'`);
    return;
  }

  // =========== SUCCESS VALIDATION ===========

  login.process(username, password);
})

login.process = (user, pass) => {
  console.log('processing login request');
  $.post(`${__API_URL__}/v1/users`, {username: user, password: pass})
  .then(result => console.log('request processed', result));
}

login.clear = () => {
  $('#userPop').empty();
  $('#passwordPop').empty();
  $('#userPop').css('padding-bottom', '0');
}
