import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

const dealersResponse = await fetch(`${API_BASE_URL}/admin/dealer/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const dealersData = await dealersResponse.json();