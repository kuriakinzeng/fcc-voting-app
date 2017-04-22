const Poll = require('../models/poll');
const User = require('../models/user');
const Option = require('../models/option');

exports.index = function(req, res, next) {
  Poll.find({}).populate('_creator').exec(function(err,data){
      if(err) return next(err);
      return res.json({ polls: data });
  });
};

exports.create = function(req, res, next) {
  const { userEmail:email, name, options } = req.body.data;
  let optionsArray = options.split(",");

  User.findOne({email:email}, function(err,user){
    if(err) return next(err);
    pollModel = new Poll({_creator:user.id, name});
    pollModel.save((err, poll) => {
      if(err) return next(err);
      optionsArray = optionsArray.map(function(name){
        return {
          _poll: poll.id,
          name: name,
          voters: [],
        }
      });
      Option.collection.insertMany(optionsArray,function(err,optionsInserted){
        if(err) return next(err);

        Poll.findOne({_id:poll.id},function(err,pollFound){
          if(err) throw (err);

          Option.find({_poll:pollFound._id},function(err, optionsFound){
            pollFound.options = optionsFound;
            return res.json(pollFound)
          })
        })
      })
    })
  })
}
