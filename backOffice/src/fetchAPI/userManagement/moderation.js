import { API_BASE_URL, token } from "../login.js";
import {statusCodes, statusCodesError} from "../utils/statusCode.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";

export const banUser = async (id) =>{
    const expectedCode = 204;
    return await exponentialRetry(async () => {
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
        statusCodesError(response, expectedCode);

        return response.status === expectedCode;
    })
}

export const unbanUser = async (id) =>{
    const expectedCode = 204;
    return await exponentialRetry(async () => {
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
        statusCodesError(response, expectedCode);

        return response.status === expectedCode;
    })
}