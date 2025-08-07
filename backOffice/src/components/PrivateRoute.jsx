import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
}

export default PrivateRoute;