const Authentication = require('./controllers/authentication')
const Polls = require('./controllers/polls')
const Options = require('./controllers/options')
const passportService = require('./services/passport')
const passport = require('passport')

const requireToken = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    // requireToken checks if token given at authorization header is valid
    // app.get('/', requireToken, function(req, res) {
    //     res.send({ message: 'Super secret code is ABC123' });
    // });

    // requireSignin attempts to log user in
    // if user is verified, then passport returns user 
    // to be exchanged for token at Authentication.signin
    // if email/pwd is wrong, then returns Unauthorized
    app.post('/signin', requireSignin, Authentication.signin);

    // allows post to signup given creds & return token
    app.post('/signup', Authentication.signup);

    app.get('/polls', Polls.getAllPolls);
    app.put('/polls', Polls.updateVoters);
    app.delete('/polls', requireToken, Polls.deletePoll);
    app.post('/polls/create', requireToken, Polls.createPoll);
    app.get('/polls/:id', Polls.getPollById);
    app.options("*",function(req,res,next){
        res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //other headers here
        res.status(200).end();
    });
}