import { API_BASE_URL, token } from "../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";

export const promoteUser = async (id) =>{
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

export const demoteUser = async (id) =>{
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