const passport = require('passport');
const User = require('../models/user.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv').config();
const LocalStrategy = require('passport-local');


// Jwt for persisting login
// Note: express http converts all headers to lower case. 
// So even though we send Authorization as header, we need to extract it here as authorization
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // console.log('jwtLogin:',payload);
    // extract the user and pass to the controller as req.user
    User.findById(payload.sub, function (err, user) {
        if (err) return done(err, false)
        if (user)
            done(null, user)
        else
            done(null, false)
    });
});
passport.use(jwtLogin);




// local strategy for actual signing in
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, pwd, done){
    // console.log('local login', email, pwd)
    // attempt login
    User.findOne({ email: email }, function(err, user){
        // check if user exists
        if(err) return done(err);
        if(!user) return done(null, false);
        
        // check if password is correct for this user
        user.comparePassword(pwd, function(err, isMatch){
            if(err) return done(err);
            if(!isMatch) return done(null, false);
            return done(null, user);
        });
    })
});

passport.use(localLogin);