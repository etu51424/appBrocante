export const API_BASE_URL = "http://localhost:3001/api/v1";

const loginBody = {
    username: "Test",
    password: "pw"
}

const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(loginBody),
});

// Normalement, le token devrait être un json.
// Pour éviter de modifier le token pour qu'il soit renvoyé en json côté server, j'accepte de l'interpreter en texte
export const token = await loginResponse.text();
//console.log("Login réussi. Token reçu :", token);

if (!loginResponse.ok) {
    throw new Error(`Login raté: ${"Login raté"}`);
}
