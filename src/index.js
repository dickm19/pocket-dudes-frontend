import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
); 


serviceWorker.unregister();
