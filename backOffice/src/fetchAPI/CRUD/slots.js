import { token, API_BASE_URL } from "./../login.js";

const slotsResponse = await fetch(`${API_BASE_URL}/admin/slot/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const slotsData = await slotsResponse.json();