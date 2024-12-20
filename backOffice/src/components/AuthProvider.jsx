import React, { createContext, useState, useContext } from "react";

// créer le contexte sur lequel le token sera disponible
const AuthContext = createContext();

// exporte un hook custom "useAuth" qui permet d'accéder au contexte
export const useAuth = () => useContext(AuthContext);

// le composant AuthProvider wrap l'appli et offre les méthodes de login/logut
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = async (username, password) => {

        const loginBody = {
            username : username,
            password : password
        }

        const response = await fetch(`http://localhost:3001/api/v1/client/person/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginBody),
        });

        if (response.status === 201) {
            const token = await response.text();
            setToken(token); // stocke le contexte globalement dans l'appli
        } else {
            throw new Error("Failed to log in");
        }
    };

    const logout = () => setToken(null); // au logout, le token est set à null (supprimé)

    // vérifie si le token existe pour verif si l'user est authentifié
    //rappel : !! convertit un string/null en true/false
    const isAuthenticated = () => { return !!token};

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};