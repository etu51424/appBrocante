export const getTokenFromStorage = () => {
    const token = localStorage.getItem("authToken");
    const expiration = parseInt(localStorage.getItem("authTokenExpiration") || "0", 10);
    const now = Date.now();

    // Vérifie si le token est absent OU expiré
    if (!token || now > expiration) {
        alert("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiration");
        window.location.href = "/login";
    } else{
        return token;
    }
};
