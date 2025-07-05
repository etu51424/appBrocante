import { API_BASE_URL, token } from "../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";

export const promoteUser = async (id) =>{
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

        if (response.status !== 204) {
            let error = new Error(`Mauvais status code : ${response.status}`);
            error.status = response.status;
            error.response = response;
            throw error;
        }

        return response.status === 204;
    })
}

export const demoteUser = async (id) =>{
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

        if (response.status !== 204) {
            let error = new Error(`Mauvais status code : ${response.status}`);
            error.status = response.status;
            error.response = response;
            throw error;
        }

        return response.status === 204;
    })

}