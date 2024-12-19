export const API_BASE_URL = "http://localhost:3001/api/v1";
//import {hash, hash_verify} from './hash.js';

const loginBody = {
    username: "Test",
    password: "pw"
}

const loginResponse = await fetch(`${API_BASE_URL}/client/person/login`, {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(loginBody),
});


if (loginResponse.status !== 201) {
    throw new Error(`Login raté: ${"Login raté"}`);
}

// Normalement, le token devrait être un json.
// Pour éviter de modifier le token pour qu'il soit renvoyé en json côté server, j'accepte de l'interpreter en texte
export const token = await loginResponse.text();
//console.log("Login réussi. Token reçu :", token);

