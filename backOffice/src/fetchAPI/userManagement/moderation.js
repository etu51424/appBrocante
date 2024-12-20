import { API_BASE_URL } from "../login.js";

export const banUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/moderation/ban`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id})
        }
    );

    if (response.status !== 204) {
        throw new Error(`Echec au banissement : ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export const unbanUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/moderation/unban`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id})
        }
    );

    if (response.status !== 204) {
        throw new Error(`Echec au débanissement : ${response.statusText}`);
    } else {
        return await response.json();
    }
}