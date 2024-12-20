import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    console.log("isAuthenticated:", isAuthenticated()); // Vérifie si l'utilisateur est authentifié


    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;