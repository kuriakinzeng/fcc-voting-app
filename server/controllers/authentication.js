const jwt = require('jwt-simple');
const User = require('../models/user');
const dotenv = require('dotenv').config();

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ 
        sub: user.id, 
        iat: timestamp 
    }, process.env.JWT_SECRET)
}

exports.signin = function(req, res, next) {
    // Users have verified their email and password
    // We just have to provide the token
    res.send({ email: req.user.email, token: tokenForUser(req.user) });
}

exports.signup = function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password)
        return res.status(422).send({ error: 'Please provide email and password.'})
    
    User.findOne({email:email},function(err,existingUser){
        if(err) return next(err)

        if(existingUser)
            return res.status(422).send({ error: 'Email is in use.'})
        
        const user = new User({
            email: email,
            password: password
        })

        user.save((err)=>{
            if(err) return next(err);
            // Q: How does token work across session?
            return res.json({ email: req.user.email, token: tokenForUser(user) })
        })
    })
}