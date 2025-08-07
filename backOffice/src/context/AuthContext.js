import {useContext, createContext} from "react";

// créer le contexte sur lequel le token sera disponible
export const AuthContext = createContext();

// exporte un hook custom "useAuth" qui permet d'accéder au contexte
export const useAuth = () => useContext(AuthContext);