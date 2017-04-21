import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
    </Route>
)