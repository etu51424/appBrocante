import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

// construire la requete pour recup les articles
const articlesResponse = await fetch(`${API_BASE_URL}/admin/article/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});
/*
if (!articlesResponse.ok) {
    throw new Error(`Regarde pop statusText car pas réussi à récup les articles: ${articlesResponse.statusText}`);
}*/

export const articlesData = await articlesResponse.json();