import { API_BASE_URL, token } from "../login.js";
import {statusCodes} from "../utils/statusCode.js";

export const promoteUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/promotion/promote/${id}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return statusCodes(response);
}
export const demoteUser = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/promotion/demote/${id}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return statusCodes(response);
}