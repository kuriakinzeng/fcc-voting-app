 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const bcrypt = require('bcrypt-nodejs');

 // Define our schema
 const userSchema = new Schema({
     email: { type: String, unique: true, lowercase: true },
     password:  String,
     polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
 });

// this.password is the hashed password, with this refers to user model 
userSchema.methods.comparePassword = function(candidatePwd, callback){
    bcrypt.compare(candidatePwd, this.password, function(err,isMatch){
        if(err) return callback(err);
        callback(null,isMatch);
    })
}

// somehow using (next) => {} doesn't work
userSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

 // Create the model class and export it
module.exports = mongoose.model('User',userSchema);
