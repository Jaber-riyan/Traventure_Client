import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from '../Firebase/Firebase.config';
import axios from 'axios';
import UseAxiosSecure from '../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UseAxiosNormal from '../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';


const Authentication = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const handleLogout = () => {
        setLoading(true);
        return signOut(auth)

    }

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // social register 
    const googleRegister = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser) {
                setUser(currentUser);
                setLoading(false)
                // console.log("current user -->", currentUser);
                const user = { email: currentUser.email }
                axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/jwt/create`, user, { withCredentials: true })
                    .then(data => {
                        // console.log(data.data);
                        if (data.data.token) {
                            // token set in the client side local storage 
                            localStorage.setItem('authToken', data.data.token)
                            // setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('authToken')
                setLoading(false)
            }
            // setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        handleRegister,
        handleLogout,
        handleLogin,
        loading,
        googleRegister,
        setLoading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authentication;