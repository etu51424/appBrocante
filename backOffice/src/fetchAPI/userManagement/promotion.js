import { API_BASE_URL } from "../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";

export const promoteUser = async (id) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;
        return await exponentialRetry(async () => {
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
            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        })
    }
}

export const demoteUser = async (id) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;
        return await exponentialRetry(async () => {
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

            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        })
    }
}