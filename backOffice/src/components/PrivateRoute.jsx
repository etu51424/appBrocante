import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated :" + isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;