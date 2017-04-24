// const Option = require('../models/option');

// exports.updateVoters = function(req, res, next) {
//   Option.findById(req.body.optionId,function(err,optionFound){
//     const userNotVoted = req.body.userEmail && optionFound.voters.indexOf(req.body.userEmail) === -1;
//     const ipNotVoted = req.ip && optionFound.voters.indexOf(req.ip) === -1;
//     const voters = [];
//     if(userNotVoted) 
//       voters.push(req.body.userEmail);
//     if(ipNotVoted)
//       voters.push(req.ip);
//     if(userNotVoted || ipNotVoted){
//       Option.update({_id:req.body.optionId},{
//         $push: { voters: { $each: voters } }
//       }, { new: true }, function (err, raw) {
//         if(err) return next(err);
//         res.json(optionFound);
//       })
//     } else {
//       res.status(500).send('One vote per user.');
//     }
//   })
// }