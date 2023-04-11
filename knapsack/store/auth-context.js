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
        console.log("UId 1"+uid);
        //AsyncStorage.setItem('token', token);
    }

    function authenticate(token){
        setAuthToken(token);
        
        AsyncStorage.setItem('token', token);
    }

    function logout(){
        setAuthToken(null);
        setAuthUid(null);
        AsyncStorage.removeItem('token');
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