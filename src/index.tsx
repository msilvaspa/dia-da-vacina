import React from 'react';
import ReactDOM from 'react-dom';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import App from './App';
import reportWebVitals from './reportWebVitals';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKnWxpFFeMkVLKky6Z8N0PyqgxgCTSf4U",
  authDomain: "dia-da-vacina.firebaseapp.com",
  projectId: "dia-da-vacina",
  storageBucket: "dia-da-vacina.appspot.com",
  messagingSenderId: "89993196266",
  appId: "1:89993196266:web:6f01bbd17717dcff485d93",
  measurementId: "G-XF06BSCJSB"
};

const fb = firebase.initializeApp(firebaseConfig);
export const analytics = fb.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
