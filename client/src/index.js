import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import Login from "./components/login/index"
import Signup from "./components/signup/index";
import Login from "./components/login/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Signup/> */}
    
    <Login />

  </React.StrictMode>
);
