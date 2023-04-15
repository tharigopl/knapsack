import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token:'',
    uid:'',
    isAuthenticated: false,
    authenticate: (token) => {},
    setUid: (uid) => {},
    logout: () => {}
});

function AuthContextProvider({children}){

    const [authToken, setAuthToken] = useState();
    const [authUid, setAuthUid] = useState();

    function setUid(uid){
        setAuthUid(uid);
        console.log("UId "+uid);        
        AsyncStorage.setItem('uid', uid);
    }

    function authenticate(token){
        setAuthToken(token);       
        console.log("UId Toekn "+token); 
        AsyncStorage.setItem('token', token);
    }

    function logout(){
        console.log("log out 1");
        setAuthToken(null);
        setAuthUid(null);
        console.log("log out");
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('uid');
    }

    const value = {
        token: authToken,
        uid: authUid,
        isAuthenticated: !!authToken,
        authenticate:authenticate,
        setUid:setUid,
        logout:logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;