import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import userSlice from './store/state/login.js';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import menuSlice from './components/home/menuSlice.js';

const reducer = combineReducers({
  user: userSlice,
  menu : menuSlice
});

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
