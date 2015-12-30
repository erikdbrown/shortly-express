var request = require('request');
var jwt = require('jsonwebtoken');
var User = require('../app/models/user.js');
var bcrypt = require('bcrypt-nodejs');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};


/************************************************************/
// Add additional utility functions below
/************************************************************/

exports.isLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log('redirect to /login');
    res.redirect('/login');
  }
};

exports.addNewUser = function(req, res, next) {
  
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    console.log('password hashed : ', hash);
    var user = new User({username: req.body.username, passwordHash: hash });
    user.fetch().then(function(model) {
      if (!model) {
        console.log("it's saving to the db");
        user.save();
        next();
      } else {
        console.log("Username is already taken.");
      }
    });
  });
};

exports.logInUser = function(req, res, next) {
  req.session.regenerate(function(){
    req.session.user = req.body.username;
    res.redirect('/');
  });
};

exports.validateUsernamePassword = function(req, res, next) {
  var user = new User({username: req.body.username});
  user.fetch().then(function(model) {
    if (model) {
      console.log('user fetched successfully');
      console.log('stored hash: ', model.get('passwordHash'));
      bcrypt.compare(req.body.password, model.get('passwordHash'), function (err, response){
        if (response) {
          console.log('Password Validated');
          next();
        } else {
          console.log('Invalid Password');
          req.session.error = 'Access denied!';
          res.redirect('/login');     
        }
      });
    } else {
      console.log('Invalid username');
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  });  
};

exports.assignToken = function (username, passwordHash) {
  var userObject = {
    username: username,
    passwordHash: passwordHash
  };

  var token = jwt.sign(userObject, 'secretkey', { expiresIn: '12h' }, function (token) {
    console.log('Token assigned as: ', token);
    // $window.localStorage.accessToken = token;
  });

};

exports.checkForToken = function () {
  // var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // jwt.verify(token);
};

  function tokenSuccess(err, response) {
    if(err){
        throw err;
    }
}



