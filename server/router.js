const Authentication = require('./controllers/authentication')
const Polls = require('./controllers/polls')
const Options = require('./controllers/options')
const passportService = require('./services/passport')
const passport = require('passport')

const requireToken = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    // requireToken checks if token given at authorization header is valid
    app.get('/', requireToken, function(req, res) {
        res.send({ message: 'Super secret code is ABC123' });
    });
    
    // requireSignin first check if user is already signed in?
    // if yes, then passport returns user to be exchanged for token at Authentication.signin
    // if no, then returns Unauthorized
    app.post('/signin', requireSignin, Authentication.signin);

    // allows post to signup given creds & return token
    app.post('/signup', Authentication.signup);

    app.get('/polls', Polls.getAllPolls);
    app.put('/polls', Polls.updateVoters);
    app.delete('/polls', Polls.deletePoll);
    app.post('/polls/create', Polls.createPoll);
    app.get('/polls/:id', Polls.getPollById);
}