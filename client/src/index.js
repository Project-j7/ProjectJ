import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Component imports
import Error from "./pages/Error/Error";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Main from "./pages/Mainpage/Main";
import ImageToImage from "./pages/Mainpage/ImageToImage";
import TextToImage from "./pages/Mainpage/TextToImage";
// import Collections from "./pages/Mainpage/Collections";
// import Favorites from "./pages/Mainpage/Favorites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/account/login",
        element: <Login />,
    },
    {
        path: "/account/signup",
        element: <Signup />,
    },
    {
        path: "/account/main",
        element: <Main />,
        children: [
            { path: "image-to-image", element: <ImageToImage /> },
            { path: "text-to-image", element: <TextToImage /> },
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
