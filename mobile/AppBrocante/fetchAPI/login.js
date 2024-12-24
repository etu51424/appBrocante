import {statusCodes} from "./utils/statusCodes";

export const API_BASE_URL = `http://192.168.1.34:3001/api/v1`;
export let USER_TOKEN = null

export async function login(username, password) {
    // login définis pour le test [A CHANGER AVANT LA REMISE]
    const loginBody = {
        username: "Admin",
        password: "brocante"
    }
    try {
        const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginBody),
        });

        let statusIsValid = await statusCodes(response);

        if (statusIsValid) USER_TOKEN = await loginResponse.text();;

    } catch (e) {
        console.error(`Erreur lors du login : ${e.message}`);
    }
}
