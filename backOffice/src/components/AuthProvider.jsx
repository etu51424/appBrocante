import {useContext, createContext, useState} from "react";
import { loginFetch } from "../fetchAPI/login";
import toast from "react-hot-toast";

// créer le contexte sur lequel le token sera disponible
export const AuthContext = createContext();

// exporte un hook custom "useAuth" qui permet d'accéder au contexte
export const useAuth = () => useContext(AuthContext);


// le composant AuthProvider wrap l'appli et offre les méthodes de login/logout
export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); //redondant mais utile

    const login = async (username, password) => {
        try {
            const success = await loginFetch(username, password);
            setIsLoggedIn(true);
            return success;
        } catch (e) {
            console.error(`LOGIN ERROR HAPPENED : ${e}`);
            toast.error(`LOGIN ERROR HAPPENED : ${e}`);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value} {...props} />
    );
};