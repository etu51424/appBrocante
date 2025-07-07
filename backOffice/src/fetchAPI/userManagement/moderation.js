import { API_BASE_URL } from "../login.js";
import {statusCodesError} from "../utils/statusCode.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";

export const banUser = async (id) =>{
    const token = getTokenFromStorage();
    if (token) {
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
                    body: JSON.stringify({id})
                }
            );
            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        });
    }
}

export const unbanUser = async (id) =>{
    const token = getTokenFromStorage();
    if (token) {
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
                    body: JSON.stringify({id})
                }
            );
            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        });
    }
}