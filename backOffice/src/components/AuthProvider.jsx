import React, {useContext, createContext, useState, useEffect} from "react";
import { loginFetch } from "../fetchAPI/login";

// créer le contexte sur lequel le token sera disponible
const AuthContext = createContext();

// exporte un hook custom "useAuth" qui permet d'accéder au contexte
const useAuth = () => useContext(AuthContext);


// le composant AuthProvider wrap l'appli et offre les méthodes de login/logut
const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); //redondant mais utile
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        let jwtToken;
        try {
            jwtToken = await loginFetch(username, password);
            setIsLoggedIn(true);
            setToken(jwtToken);
        } catch (e) {
            console.error(`LOGIN ERROR HAPPENED : ${e}`);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null); // au logout, le token est set à null (supprimé)
    };

    const value = {
        isLoggedIn,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value} {...props} />
    );
};



export { AuthContext, useAuth, AuthProvider };