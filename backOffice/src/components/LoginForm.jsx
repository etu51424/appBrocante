import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "../css/LoginForm.css";
import { getRecoveryEmail, validateRecoveryCode } from "../fetchAPI/userManagement/passwordRecovery.js";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [forgotMode, setForgotMode] = useState(false);
    const [mailSent, setMailSent] = useState(false);
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const success = await login(username, password);
            if (success){
                setUsername("");
                setPassword("");
                navigate("/home");
            }
        } catch (err) {
            setError(`Erreur lors de la connexion : ${err}`);
            console.error(`Erreur lors de la connexion : ${err}`);
            toast.error(`Erreur lors de la connexion : ${err}`);
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            await getRecoveryEmail(identifier);
            setMailSent(true);
        } catch (err) {
            setError(`Une erreur est survenue lors de l'envoi de l'e-mail : ${err}`);
            toast.error(`Une erreur est survenue lors de l'envoi de l'e-mail : ${err}`);
        }
    };

    const handlePasswordResetConfirmation = async (event) => {
        event.preventDefault();

        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]{8,}$/;

        if (!passwordRequirements.test(newPassword)) {
            setError(
                "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const result = await validateRecoveryCode({
                personId: identifier,
                recoveryCode: verificationCode,
                password: newPassword
            });

            if (result) {
                resetAll();
            } else {
                setError(`Erreur lors de la réinitialisation du mot de passe : ${result}`);
            }
        } catch (err) {
            setError(`Erreur lors de la réinitialisation du mot de passe : ${err}`);
            toast.error(`Erreur lors de la réinitialisation du mot de passe : ${err}`);
        }
    };

    const resetAll = () => {
        setForgotMode(false);
        setMailSent(false);
        setIdentifier("");
        setVerificationCode("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
    };

    return (
        <div className="loginPage">
            <h2>Connect to admin dashboard</h2>

            {!forgotMode ? (
                <form onSubmit={handleSubmit} className="centeredForm">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <button type="submit">Se connecter</button>
                    <button
                        type="button"
                        onClick={() => {
                            setForgotMode(true);
                            setUsername("");
                            setPassword("");
                            setError("");
                        }}
                    >
                        J'ai oublié mon mot de passe
                    </button>
                </form>
            ) : (
                <form className="centeredForm">
                    {!mailSent ? (
                        <>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Numéro identifiant"
                            />
                            <button onClick={handleForgotPassword}>Envoyez un mail</button>
                            <button type="button" onClick={resetAll}>
                                Retour à la connexion
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Code de vérification"
                            />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nouveau mot de passe"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmer le mot de passe"
                            />
                            <button onClick={handlePasswordResetConfirmation}>
                                Confirmer le changement
                            </button>
                            <button type="button" onClick={resetAll}>
                                Retour à la connexion
                            </button>
                        </>
                    )}
                </form>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginForm;
