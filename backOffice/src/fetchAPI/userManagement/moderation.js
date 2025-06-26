import { API_BASE_URL, token } from "../login.js";
import {statusCodes} from "../utils/statusCode.js";

export const banUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/moderation/ban/${id}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id})
        }
    );
    return statusCodes(response);
}

export const unbanUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/moderation/unban/${id}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id})
        }
    );

    return statusCodes(response);
}