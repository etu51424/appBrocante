import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;