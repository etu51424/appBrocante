import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

const usersResponse = await fetch(`${API_BASE_URL}/admin/person/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const usersData = await usersResponse.json();