var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: false,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      console.log(model.get('username'));
      model.set('username', model.get('username'));
      // bcrypt.hash(params.password, null, null, function(err, hash) {
      //   self.set('passwordHash', hash); // need to send this to the db.
      // });
      model.set('passwordHash', model.get('passwordHash'));
    });
  }
});

module.exports = User;