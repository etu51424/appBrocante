import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "../css/LoginForm.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");

    // hook pour aller vers une route
    const navigate = useNavigate();

    // demande un network request fora jwttoken
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          // appel  login / se login avec les username et password entrés
            await login(username, password);

        } catch (err) {
            setError("Erreur lors de la connexion.");
        }
        navigate("/home"); // atteint seulement si soit erreur pas caught soit pas d'erreur
    };

    return (
        <div className="loginPage">
            <h2 >Connect to admin dashboard</h2>
            <form onSubmit={handleSubmit} class="centeredForm">
                <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Nom d'utilisateur" />
                <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginForm;