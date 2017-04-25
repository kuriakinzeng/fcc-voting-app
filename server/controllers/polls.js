const Poll = require('../models/poll');
const User = require('../models/user');
const Option = require('../models/option');
const ObjectId = require('mongoose').Types.ObjectId
const async = require('async');

const findOptionOfPoll = function(poll, next){
  Option.find({_poll:ObjectId(poll._id)},function(err,optionsFound){
    if(err) return done(err);
    const optionObject = {
      pollId: poll._id,
      options: optionsFound
    };
    next(null, optionObject);
  }) 
}

exports.getAllPolls = function(req, res, next) {
  Poll.find({}, function(err, polls){
      if(err) return next(err);

      async.map(polls, findOptionOfPoll, function(err,options){ 
        if(err) return next(err);
        polls.map(function(poll){
          poll.options = options.find((option) => {
            return option.pollId === poll._id
          }).options
        })
        // console.log('results:',polls);
        return res.json(polls);
      });
  });
};

exports.createPoll = function(req, res, next) {
  const { user, name, options } = req.body.data;
  
  let optionsArray = options.split(",");

  User.findById(user._id, function(err,user){
    if(err) return next(err);
    pollModel = new Poll({_creator:ObjectId(user.id), name});
    pollModel.save((err, poll) => {
      if(err) return next(err);
      optionsArray = optionsArray.map(function(name){
        return {
          _poll: ObjectId(poll.id),
          name: name,
          votes: 0,
        }
      });
      Option.collection.insertMany(optionsArray,function(err,optionsInserted){
        if(err) return next(err);

        Poll.findById(poll.id,function(err,pollFound){
          if(err) return next(err);

          Option.find({_poll:ObjectId(pollFound._id)},function(err, optionsFound){
            if(err) return next(err);
            pollFound["options"] = optionsFound;
            return res.status(200).json(pollFound);
          })
        })
      })
    })
  })
}

exports.getPollById = function(req, res, next) {
  Poll.findById(req.params.id, function(err, pollFound){
    if(err) return next(err);
    Option.find({_poll:ObjectId(pollFound._id)},function(err, optionsFound){
      if(err) next(err);
      pollFound.options = optionsFound;
      return res.json(pollFound);
    })
  })
}

exports.updateVoters = function(req, res, next) {
  Poll.findById(req.body.pollId,function(err,pollFound){
    const userNotVoted = req.body.user && req.body.user._id && pollFound.voters.indexOf(req.body.user._id) === -1;
    const ipNotVoted = req.ip && pollFound.voters.indexOf(req.ip) === -1;
    const voters = [];
    if(userNotVoted) 
      voters.push(req.body.user._id);
    if(ipNotVoted)
      voters.push(req.ip);
    if(userNotVoted || ipNotVoted){
      
      Poll.update({_id:pollFound._id},{
        $push: { voters: { $each: voters } }
      }, { new: true }, function (err, raw) {
        if(err) return next(err);

        // if existing option
        if(req.body.optionId) {
          Option.findByIdAndUpdate(req.body.optionId,
          { $inc: { votes: 1 } }, { new: true }, function(err, updatedOption){ 
            // return object to client -- duplicated as below
            Option.find({_poll:ObjectId(pollFound._id)},function(err, optionsFound){
              if(err) return next(err);
              pollFound.options = optionsFound;
              return res.json(pollFound);
            });
          });
        } else {
          Option.create({
            _poll: pollFound._id,
            name: req.body.customOption,
            votes: 1,
          }, function(err, data){
            if(err) return next(err);
            // return object to client
            Option.find({_poll:ObjectId(pollFound._id)},function(err, optionsFound){
              if(err) return next(err);
              pollFound.options = optionsFound;
              return res.json(pollFound);
            });
          });
        }

      })
    } else {
      res.status(500).send('One vote per user.');
    }
  })
}

exports.deletePoll = function(req, res, next){
  const { pollId, user } = req.body;
  Poll.findByIdAndRemove(pollId,function(err, pollRemoved){
    if(err) return next(err);
    res.status(200).send('Poll deleted');
  })
}