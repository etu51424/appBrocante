// ici faut
// récupérer le calcul de nb brocantes par mois qui est réalisé côté server pour limiter le temps d'affichage coteclient

import { token, API_BASE_URL } from "./../login.js";

const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const statsData = await statsResponse.json();