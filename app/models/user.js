var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: false,

  initialize: function() {
    // this.on('creating', function(model, attrs, options) {
      // model.set('username', model.get('username'));
      // bcrypt.hash(model.get('passwordHash'), null, null, function(err, hash) {
      //   console.log('password hashed : ', hash);
      //   model.set('passwordHash', hash); // need to send this to the db.
      //   // model.save();
      // });
    // });
  }
});

module.exports = User;