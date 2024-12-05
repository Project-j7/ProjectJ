import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";

// Component imports
import Error from "./components/Error/Error";
import Signup from "./components/signup/index";
import Login from "./components/login/index";
import Home from "./components/Home/Home";
import Main from "./components/Mainpage/Main/Main";
import ImageToImage from "./components/Mainpage/ImageToImage/ImageToImage";
import TextToImage from "./components/Mainpage/TestToImage/TextToImage";
// import Collections from "./components/Mainpage/Collections/Collections";
// import Favorites from "./pages/Mainpage/Favorites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>,
    },
    {
        path: "/account/login",
        element: <Login/>,
    },
    {
        path: "/account/signup",
        element: <Signup/>,
    },
    {
        path: "/account/main",
        element: <Main/>,
        children: [
            {path: "image-to-image", element: <ImageToImage/>},
            {path: "text-to-image", element: <TextToImage/>},
            // { path: "collections", element: <Collections /> },
            // { path: "favorites", element: <Favorites /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="532076644406-7gn4q5lupm7vk7oq1oqi3pd005c293vd.apps.googleusercontent.com">
            <RouterProvider router={router}/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
