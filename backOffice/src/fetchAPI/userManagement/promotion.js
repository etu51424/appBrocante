import { API_BASE_URL } from "../login.js";

export const promoteUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/promotion/promote`,
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
        throw new Error(`Echec à la promotion administrateur : ${response.statusText}`);
    } else {
        return await response.json();
    }
}
export const demoteUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/promotion/demote`,
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
        throw new Error(`Echec à la rétrogadation User : ${response.statusText}`);
    } else {
        return await response.json();
    }
}