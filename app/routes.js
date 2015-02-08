var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = require('./config/jwt').secret;

var createToken = function(user){
    return jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name
    }, secret, {expiresInMinutes: 60*5});
};

var User = require('./users/user');

module.exports = function(app, passport){
    app.post('/auth', function(req, res, next){
        passport.authenticate('local', { session: false }, function(err, user, info) {
            if (err) { return res.status(500).json(err); }
            if (!user) { return res.status(401).json(info); }

            return res.json({
                jwt:createToken(user),
                username:user.name
            });
        })(req, res, next);

    });

    app.post('/register', function(req, res){
        var email = req.body.email
            , password = req.body.password
            , name = req.body.name;

        User.findOne({'email': email}, function(err, user){
            if(err) return res.status(500).json(err);

            if(user) return res.status(400).json({'message':'This E-mail has been already taken'});

            var newUser = new User();
            newUser.email = email;
            newUser.password = password;
            newUser.name = name;

            newUser.save(function(err){
                if(err) throw err;
                return res.json({
                    jwt:createToken(newUser),
                    username:newUser.name
                });
            });
        })
    });

    // Check Auth
    app.get('/auth', expressJwt({secret:secret}), function(req, res){
        res.json({currentUser:req.user});
    });

    app.get('*', function(req,res){
        res.sendfile('./public/index.html');
    });
};