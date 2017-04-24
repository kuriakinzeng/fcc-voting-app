import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PollNew from './components/PollNew';
import Poll from './components/Poll';
import MyPolls from './components/MyPolls';
import RequireAuth from './components/RequireAuth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="create" component={RequireAuth(PollNew)} />
        <Route path="mypolls" component={RequireAuth(MyPolls)} />
        <Route path=":pollId" component={Poll} />
    </Route>
)