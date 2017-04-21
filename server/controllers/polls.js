const Poll = require('../models/poll');

exports.index = function(req, res, next) {
  Poll.find({}).populate('_creator').exec(function(err,data){
      if(err) return next(err);
      return res.json({ polls: data });
  });
};

exports.create = function(req, res, next) {
  const { _creator, name, options } = req.body;
  const pollModel = new Poll({_creator, name, options});
  pollModel.save((err, poll) => {
    if(err) return next(err);
    return res.json(poll);
  })
  
}