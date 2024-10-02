import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';


//css import 
import "./index.css";

//components imports
import Error from './pages/Error/Error';
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Main from "./pages/Mainpage/Main";

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
    },
    {
        path: 'account/main',
        element: <Main/>
    },
])

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="532076644406-7gn4q5lupm7vk7oq1oqi3pd005c293vd.apps.googleusercontent.com">
            <RouterProvider router={router}/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
