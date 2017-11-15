'use strict';

var __API_URL__ = 'https://roastful.herokuapp.com';



// process the login attempt
login.process = (user, pass) => {
  console.log('processing login request');
  $.post(`${__API_URL__}/v1/users`, {username: user, password: pass})
  .then(result => console.log('request processed', result));
}

// clear validation errors
login.clear = () => {
  $('#userPop').empty();
  $('#passwordPop').empty();
  $('#userPop').css('padding', '0');
}


// --------- EVENT HANDLERS --------- //

// register switch
$('#login a').click(function(e) {
  if ($('#login a').text() === 'register') {
    login.clear();
    $('#login h1').text('Register');
    $('#login button[name="login"]').hide();
    $('#login button[name="register"]').fadeIn();
    $('#login a').text('login');
  } else {
    login.clear();
    $('#login h1').text('Login');
    $('#login button[name="register"]').hide();
    $('#login button[name="login"]').fadeIn();
    $('#login a').text('register');
  }
})

// register validation
$('#login button[name="register"]').click(function(e) {
  let username = $('#username').val();
  let password = $('#password').val();
  console.log('login test');
  login.clear();

  if (!login.validation()) {
    console.log('validation');
    return;
  }
  
  console.log('after validation');
  // =========== SUCCESS VALIDATION ===========
  login.process(username, password);
})

// =========== USERNAME VALIDATION ===========
login.validation = () => {
  let $userValidation = $('#userPop');
  let $passValidation = $('#passwordPop');
  let username = $('#username').val();
  let password = $('#password').val();

  if (username.length <= 0) {
    // console.log('requires username');
    $('#userPop').css('padding', '1vw 0');
    $userValidation.text('requires username');
    return;
  }
  if (/[\W]/.test(username)) {
    // must contain [a-zA-Z0-9_]
    $('#userPop').css('padding', '1vw 0');
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

  return true;
}
