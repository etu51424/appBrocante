import {useContext, createContext, useState} from "react";
import { loginFetch } from "../fetchAPI/login";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

// créer le contexte sur lequel le token sera disponible
export const AuthContext = createContext();

// exporte un hook custom "useAuth" qui permet d'accéder au contexte
export const useAuth = () => useContext(AuthContext);

// le composant AuthProvider wrap l'appli et offre les méthodes de login/logout
export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); //redondant mais utile
    const langDict = useSelector(state => state.language.langDict);

    const login = async (username, password) => {
        try {
            const {loginNotFound, tokenExists, isAdmin} = await loginFetch(username, password);
            const success = !loginNotFound && tokenExists && isAdmin;

            if (loginNotFound) {
                toast.error(langDict.loginNotFound)
            } else if (!isAdmin) {
                toast.error(langDict.loginRefused);
            }
            setIsLoggedIn(success);
            return success;
        } catch (e) {
            console.error(`${langDict.logginError} : ${e}`);
            toast.error(`${langDict.logginError} : ${e}`);
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

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};