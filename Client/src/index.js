import React from 'react';
import { render } from 'react-dom';
import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './Store/Reducers/reducers';

const store = createStore(reducers , applyMiddleware(thunk));


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)