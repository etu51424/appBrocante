import {statusCodes} from "./utils/statusCodes";
import {getPerson} from "./CRUD/person";

export const API_BASE_URL = `http://192.168.1.34:3001/api/v1`;
export let USER_TOKEN = null

export async function login(username, password) {
    // login définis pour le test [A CHANGER AVANT LA REMISE]
    const loginBody = {
        username: `${username}`,
        password: `${password}`
    }
    try {
        const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginBody),
        });

        let statusIsValid = await statusCodes(loginResponse);

        if (statusIsValid) {
            USER_TOKEN = await loginResponse.text();
            return await getPerson();
        }
        else{
            console.error("Wrong Login");
        }
    } catch (e) {
        console.error(`Erreur lors du login : ${e.message}`);
        return false;
    }
}
