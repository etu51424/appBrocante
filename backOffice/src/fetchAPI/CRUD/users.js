import { token, API_BASE_URL } from "./../login.js";

const usersResponse = await fetch(`${API_BASE_URL}/admin/person/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const usersData = await usersResponse.json();