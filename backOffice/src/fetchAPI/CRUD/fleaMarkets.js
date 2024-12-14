import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

const fleaMarketsResponse = await fetch(`${API_BASE_URL}/admin/fleaMarket/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const fleaMarketsData = await fleaMarketsResponse.json();