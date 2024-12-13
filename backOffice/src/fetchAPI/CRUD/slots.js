import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

const slotsResponse = await fetch(`${API_BASE_URL}/admin/slot/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const slotsData = await slotsResponse.json();