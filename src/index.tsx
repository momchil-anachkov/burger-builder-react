import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const root = document.getElementById('root') as HTMLElement;

window.onload = () => {
  root.classList.remove('preload');
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
