import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import "../css/LoginForm.css";
import { getRecoveryEmail, validateRecoveryCode } from "../fetchAPI/userManagement/passwordRecovery.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

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
    const langDict = useSelector(state => state.language.langDict);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (username !== "" && password !== "") {
                const success = await login(username, password);
                if (success) {
                    setUsername("");
                    setPassword("");
                    navigate("/home");
                }
            }
        } catch (err) {
            setError(`${langDict.loginError} : ${err}`);
            console.error(`${langDict.loginError} : ${err}`);
            toast.error(`${langDict.loginError} : ${err}`);
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            await getRecoveryEmail(identifier);
            setMailSent(true);
        } catch (err) {
            setError(`${langDict.emailError} : ${err}`);
            toast.error(`${langDict.emailError} : ${err}`);
        }
    };

    const handlePasswordResetConfirmation = async (event) => {
        event.preventDefault();

        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]{8,}$/;

        if (!passwordRequirements.test(newPassword)) {
            setError(
                langDict.passwordError
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(langDict.passwordMatchError);
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
                setError(`${langDict.passwordResetError} : ${result}`);
            }
        } catch (err) {
            setError(`${langDict.passwordResetError} : ${err}`);
            toast.error(`${langDict.passwordResetError} : ${err}`);
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
            <h2>{langDict.adminDashboardConnect}</h2>

            {!forgotMode ? (
                <form onSubmit={handleSubmit} className="centeredForm">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={langDict.username}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={langDict.password}
                    />
                    <button type="submit">{langDict.connect}</button>
                    <button
                        type="button"
                        onClick={() => {
                            setForgotMode(true);
                            setUsername("");
                            setPassword("");
                            setError("");
                        }}
                    >
                        {langDict.forgotPassword}
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
                                placeholder={langDict.id}
                            />
                            <button onClick={handleForgotPassword}>{langDict.sendEmail}</button>
                            <button type="button" onClick={resetAll}>
                                {langDict.returnToLogin}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder={langDict.recoveryCode}
                            />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder={langDict.newPassword}
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={langDict.confirmPassword}
                            />
                            <button onClick={handlePasswordResetConfirmation}>
                                {langDict.confirmChange}
                            </button>
                            <button type="button" onClick={resetAll}>
                                {langDict.returnToLogin}
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
