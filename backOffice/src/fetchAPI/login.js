export const API_BASE_URL = "http://localhost:3001/api/v1";

export async function loginFetch(username, password) {
    const loginBody = {
        username: username,
        password: password
    }

    const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(loginBody),
    });

    const token = await loginResponse.text();

    if (loginResponse.status !== 201) {  //404 instead
        throw new Error({'NoTokenWasCreated':'no token was created'});
        // Normalement, le token devrait être un json.
        // Pour éviter de modifier le token pour qu'il soit renvoyé en json côté server, j'accepte de l'interpreter en texte
    }
    return token;
}