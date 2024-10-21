import { useContext, createContext, useState, useEffect } from "react"; 
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {authentication} from "../firebase/firebase-config";

const FirebUserProvider = createContext(undefined);

export const FirebaseUserProvider = ({children}) => {
    const [firebaseUser, setfirebaseUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider);
    }

    const googleLogOut = () => {
        signOut(authentication);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
            setfirebaseUser(currentUser);

            //store details of user in database
            if(currentUser){
                const username = currentUser.displayName;
                const email = currentUser.email;

                (async function(){
                    await fetch('http://localhost:8000/user/google', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username, 
                            email: email 
                        })
                    })
                    .then((res)=>{
                        return res.json();
                    })
                    .then((data) =>{
                        console.log(data);
                    })
                    .catch(error => console.log(error));
                    
                })()
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <FirebUserProvider.Provider value={{firebaseUser, googleSignIn, googleLogOut}}>
            {children}
        </FirebUserProvider.Provider>
    );
}

export const useFirebaseUser = () => useContext(FirebUserProvider);