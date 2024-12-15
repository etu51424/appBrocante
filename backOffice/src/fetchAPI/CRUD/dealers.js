import { token, API_BASE_URL } from "./../login.js";

const dealersResponse = await fetch(`${API_BASE_URL}/admin/dealer/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const dealersData = await dealersResponse.json();