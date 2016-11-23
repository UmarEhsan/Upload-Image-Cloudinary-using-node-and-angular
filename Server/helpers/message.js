/**
 * Created by LAPTECH on 10/22/2016.
 */
var messages = {
    authorization_error : function(){
      return "User is not authorized";
    },
    not_found: function () {
        return 'Not Found';
    },
    login_missing_fields: function () {
        return "We're going to need you to fill everything out. Thanks!";
    },
    missing_fields: function(){
        return "Missing Fields !";
    },
    login_unauthentic: function () {
        return "Sorry, but there isn't anyone here with those details. Please try again.";
    },
    login_unauthorized: function () {
        return "Sorry, but you're not authorized for that.";
    },
    registration_missing_fields: function () {
        return "We're going to need you to fill everything out. Thanks!";
    },
    registration_user_exists: function () {
        return "A user with that email address is already a GiverGain user. Maybe try a different address?";
    },
    database_error:function() {
        return "There was a database error. We'll be back up shortly.";
    }
}

module.exports = messages;