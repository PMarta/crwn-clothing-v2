import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//functional Component that I ll use it
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    //obervatorul meu pt userul sing in/sign out
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
           setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}