import {API_BASE_URL} from "./../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";

// la limite est 10 et la page 1 si pas précisé, pour rester cohérent avec l'api
export const getDealersData = async (limit = 10, page = 1) => {
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 200;

        return await exponentialRetry(async () => {
            const currentPageResponse = await fetch(
                `${API_BASE_URL}/admin/dealer/all?limit=${limit}&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            //Verifier si la page d'après existe, pour déterminer si on doit proposer ou non à l'useur d'accéder à la page d'après
            //Moyen d'optimiser: ne pas fetch celle ci si nb données de la table précédente < limit
            const nextPageResponse = await fetch(
                `${API_BASE_URL}/admin/dealer/all?limit=${limit}&page=${page + 1}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            statusCodesError(currentPageResponse, expectedCode);

            if (currentPageResponse.status === expectedCode) {
                const data = await currentPageResponse.json();
                const noMoreData = nextPageResponse.status === 404;

                return {data, noMoreData};
            }
        });
    }
}

export const getAllDealersByType = async (limit = 10, page = 1, type) =>{
    const token = getTokenFromStorage();
    if (token){
        const expectedCode = 200;
        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/dealer/search?limit=${limit}&page=${page}&type=${type}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            statusCodesError(response, expectedCode);
            if (response.status === expectedCode) {
                return await response.json();
            }
        });
    }
}

export const createDealerData = async (body) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 201;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/dealer/`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            );
            statusCodesError(response, expectedCode);

            if (response.status === expectedCode) {
                return await response.json();
            }
        });
    }
}

export const updateDealerData = async (body) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/dealer/`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            );
            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        });
    }
}

export const deleteDealer = async (id) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/dealer/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            statusCodesError(response, expectedCode);

            return response.status === expectedCode;
        });
    }
}

