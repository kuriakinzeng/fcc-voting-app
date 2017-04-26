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
    // Users have verified their email and password via passport middleware
    // We just have to provide the token
    // console.log('user signin:',req.user);
    req.user.password = undefined;
    res.send({ user: req.user, token: tokenForUser(req.user) });
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

        user.save((err, userCreated)=>{
            if(err) return next(err);
            // console.log(userCreated);
            return res.json({ user: userCreated, token: tokenForUser(user) })
        })
    })
}