var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: false,
  defaults: {
    'username': '', 
    'password': ''
  },

  initialize: function(params) {

    var self = this;

    this.set('username', params.username);
    bcrypt.hash(params.password, null, null, function(err, hash) {
      self.set('passwordHash', hash); // need to send this to the db.
    });
  }
});

module.exports = User;