import {exponentialRetry} from "./utils/exponentialRetry.js";
import {statusCodesError} from "./utils/statusCode.js";

export const API_BASE_URL = "http://localhost:3001/api/v1";

export async function loginFetch(username, password) {
    const loginBody = {
        username: username,
        password: password
    }

    return await exponentialRetry(async () => {
        const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginBody),
        });

        statusCodesError(loginResponse, 201);

        const token = await loginResponse.text();
        localStorage.setItem("authToken", token);

        // Calculer l'expiration (ici : 8 heures)
        const expiration = new Date().getTime() + 8 * 60 * 60 * 1000;
        localStorage.setItem("authTokenExpiration", expiration.toString())
        console.log(!!token);
        return !!token;
    });
}