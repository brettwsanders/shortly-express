var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on("creating", function(model, attrs, options) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(model.get('password'), salt);
      model.set('salt', salt);
      model.set('password', hash);
    });
    this.on('checkPassword', this.checkPassword, this);
  },

  checkPassword: function(passwordToCheck) {
    console.log('checking password..');
    var salt = this.get('salt');
    var correctPassword = this.get('password');
    var hash = bcrypt.hashSync(passwordToCheck, salt);
    return correctPassword === hash;
  }
});



module.exports = User;

