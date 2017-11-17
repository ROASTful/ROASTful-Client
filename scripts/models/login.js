'use strict';

var __API_URL__ = 'https://roastful.herokuapp.com';
var Login = {};

// ============= EVENT HANDLERS ============== //

// ---- submit login ----
$('#login button[name="login"]').click(function(e) {
  let username = $('#username').val();
  let password = $('#password').val();
  login.clear();

  $('.recipes a.save-recipe').html('Save to My Recipes &#9745;');
  // TESTING VALIDATION
  if (!login.validation()) return;

  // AFTER SUCCESSFUL VALIDATION
  login.signIn(username, password);
})

// ---- submit registration ----
$('#login button[name="register"]').click(function(e) {
  let username = $('#username').val();
  let password = $('#password').val();
  login.clear();

  $('.recipes a.save-recipe').html('Save to My Recipes &#9745;')
  // TESTING VALIDATION
  if (!login.validation()) return;

  // AFTER SUCCESSFUL VALIDATION
  login.register(username, password);
})

// ---- switch between login and register ----
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


// ============= LOGIN FUNCTIONS ============== //

// returning users
login.returningUser = () => {
  $.get(`${__API_URL__}/returning/${localStorage.user_id}`,)
  .then(userInfo => {
    if (userInfo) {
      $('a[href="/user/login"]').text(`logout: ${userInfo.username}`);
      app.User.currentUser = new app.User(userInfo);
      app.User.currentUser.password = null;
      localStorage.user_id = JSON.stringify(app.User.currentUser.user_id);
    } else {
    }
  })
}

// process login attempt
login.register = (user, pass) => {
  $.post(`${__API_URL__}/v1/users`, {username: user, password: pass})
  .then(result => {
    if (result === 'Created') {
      $('#login').hide()
      login.signIn(user, pass);
    } else {
      $('#userPop').text('That Username Already Exists');
      $('#userPop').css('padding', '1vw 0');
    }
  });
}

// process sign-in attempt
login.signIn = (user, pass) => {
  $.get(`${__API_URL__}/v1/users/${user.toLowerCase()}/${pass}`,)
  .then(userInfo => {
    if (userInfo) {
      $('#login').hide();
      $('a[href="/user/login"]').text(`logout: ${userInfo.username}`);
      app.User.currentUser = new app.User(userInfo);
      app.User.currentUser.password = null;
      localStorage.user_id = JSON.stringify(app.User.currentUser.user_id);
      app.ingredientView.initIndexPage();
    } else {
      $('#passwordPop').text('Incorrect Password or Username');
    }
  })
}

// list of validation requirements
login.validation = () => {
  let $userValidation = $('#userPop');
  let $passValidation = $('#passwordPop');
  let username = $('#username').val();
  let password = $('#password').val();

  if (username.length <= 0) {
    $userValidation.css('padding', '1vw 0');
    $userValidation.text('requires username');
    return;
  }
  if (/[\W]/.test(username)) {
    // must contain [a-zA-Z0-9_]
    $userValidation.css('padding', '1vw 0');
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
    $passValidation.text(`password can only include 'a-z', '0-9', and '_'`);
    return;
  }

  return true;
}

// clear validation error displays
login.clear = () => {
  $('#userPop').empty();
  $('#passwordPop').empty();
  $('#userPop').css('padding', '0');
}

if (localStorage.user_id) {
  login.returningUser();
}
