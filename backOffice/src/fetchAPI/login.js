import {exponentialRetry} from "./utils/exponentialRetry.js";
import {statusCodesError} from "./utils/statusCode.js";

export const API_BASE_URL = "http://localhost:3001/api/v1";

export async function loginFetch(username, password) {
    const expectedCode = 201;

    const loginBody = {
        username,
        password
    };

    try {
        return await exponentialRetry(async () => {
            const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginBody),
            });

            // Raise if status is not expected
            statusCodesError(loginResponse, expectedCode);

            const { token, isAdmin } = await loginResponse.json();
            localStorage.setItem("authToken", token);

            // Calculer l'expiration (ici : 8 heures)
            const expiration = new Date().getTime() + 8 * 60 * 60 * 1000;
            localStorage.setItem("authTokenExpiration", expiration.toString());

            return {
                loginNotFound: false,
                tokenExists: !!token,
                isAdmin: isAdmin,
            };
        });
    } catch (err) {
        console.error(`Error while trying to login fetch: ${err}`);
        // Gestion d'erreur : retour toujours structuré
        return {
            loginNotFound: true,
            tokenExists: false,
            isAdmin: false,
        };
    }
}
