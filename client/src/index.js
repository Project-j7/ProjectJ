import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';

//css import 
import "./index.css";

//components imports
import Error from './pages/Error/Error';
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Main from "./pages/Mainpage/Main";
import { ServerUserProvider } from './contextStore/serverUserContext';
import { FirebaseUserProvider } from './contextStore/firebaseUserContext'
import Admin from "./pages/admin/index"
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
    {
        path: '/admin',
        element: <Admin/>
    }
])

root.render(
    <React.StrictMode>
        <FirebaseUserProvider>
            <ServerUserProvider>
                <RouterProvider router={router}/>
            </ServerUserProvider>
        </FirebaseUserProvider>
    </React.StrictMode>
);