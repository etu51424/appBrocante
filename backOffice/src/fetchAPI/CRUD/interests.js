import { token, API_BASE_URL } from "./../login.js";

const interestsResponse = await fetch(`${API_BASE_URL}/admin/interest/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const interestsData = await interestsResponse.json();