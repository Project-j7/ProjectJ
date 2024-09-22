// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6nce-lYMFJQ0TdY9RwpsYh0hC0Vqctto",
    authDomain: "projectj-d71f8.firebaseapp.com",
    projectId: "projectj-d71f8",
    storageBucket: "projectj-d71f8.appspot.com",
    messagingSenderId: "349428955400",
    appId: "1:349428955400:web:13a68bdc67b898ec9d14bd",
    measurementId: "G-8KC9430PEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
