import {exponentialRetry} from "./utils/exponentialRetry.js";

export const API_BASE_URL = "http://localhost:3001/api/v1";
export let token;

export async function loginFetch(username, password) {
    const loginBody = {
        username: username,
        password: password
    }

    return exponentialRetry(async () => {
        const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginBody),
        });

        if (loginResponse.status !== 201) {
            let error = new Error('No token was created');
            error.status = loginResponse.status;
            error.response = loginResponse;
            throw error;
        }
        token = await loginResponse.text();
        return token;
    });
}