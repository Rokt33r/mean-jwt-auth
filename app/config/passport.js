var LocalStrategy  = require('passport-local').Strategy;

var User = require('../users/user');

module.exports = function(passport){

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done){
        User.findOne({'email': email}, function(err, user){

            // error occurs
            if(err) return done(err);

            // no user found
            if(!user) return done(null, false, {'message':'Invalid Credentials'});

            // invalid password
            if(!(user.password == password)) return done(null, false, {'message':'Invalid Credentials'});

            return done(null, user);
        });
    }));
};