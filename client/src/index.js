import React, { Component } from 'react';
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
// console.log(process.env.NODE_ENV);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
);

const token = getToken();
if(token){
  store.dispatch(reauthUserAction());
}

export default class AppProvider extends Component {
  constructor(props){
    super(props);
    this.state = { rehydrated: false };
  }
  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    });
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <AppProvider />,
  document.getElementById('root')
);