import { useEffect, useState } from 'react'
import { createContext } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from './../firebase/firebase.config';


export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();  

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signup with email
    const signupWithEmail = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // login with email and passkword
    const login = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout
    const logout = () => {
        signOut(auth);
    }

    // update user profile
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    }

    // check signed in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
            } else {
            // User is signed out
            // ...
            }
        }); 
        
        return () => {
            return unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        createUser,
        signupWithEmail,
        login,
        logout,
        updateUserProfile,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
