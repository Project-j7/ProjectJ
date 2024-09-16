import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

//css import 
import "./index.css";

//components imports
import Error from './pages/Error/Error';
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

// rendering , main code

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>
  },
  {
    path: '/account/login',
    element: <Login/>
  },
  {
    path: '/account/signup',
    element: <Signup/>
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
