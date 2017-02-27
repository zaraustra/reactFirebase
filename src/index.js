import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAKk3Cn0SoFq6vJ8mJjVKSBKeibmWarOf8",
    authDomain: "reactfirebase-f5664.firebaseapp.com",
    databaseURL: "https://reactfirebase-f5664.firebaseio.com",
    storageBucket: "reactfirebase-f5664.appspot.com",
    messagingSenderId: "541041307318"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
