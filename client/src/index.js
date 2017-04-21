import React from 'react';
import ReactDOM from 'react-dom';
// import bootstrap from 'boostrap';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import routes from './router';
import reducers from './reducers';
import { getToken } from './helpers/localStorage';
import { loginUserAction } from './actions';

import 'bootstrap/dist/css/bootstrap.css';
import './style/index.css';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

const token = getToken();
if(token){
  store.dispatch(loginUserAction());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
