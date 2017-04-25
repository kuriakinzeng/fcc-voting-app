import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate} from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import routes from './router';
import reducers from './reducers';
import { getToken } from './helpers/localStorage';
import { reauthUserAction } from './actions';

import 'bootstrap/dist/css/bootstrap.css';
import './style/index.css';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
);
persistStore(store);

const token = getToken();
if(token){
  store.dispatch(reauthUserAction());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
