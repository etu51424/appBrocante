import { API_BASE_URL } from "./../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";
import toast from "react-hot-toast";

// la limite est 10 et la page 1 si pas précisé, pour rester cohérent avec l'api
export const getInterestsData = async (limit = 10, page = 1) => {
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 200;

        return await exponentialRetry(async () => {
            const currentPageResponse = await fetch(
                `${API_BASE_URL}/admin/interest/all?limit=${limit}&page=${page}`,
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
                `${API_BASE_URL}/admin/interest/all?limit=${limit}&page=${page + 1}`,
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

// Cette méthode est spéciale et se cale sur la logique coté serveur
export const getAllInterestsWithArgs = async (limit = 10, page = 1, {fleaMarketId, personId}) =>{
    const token = getTokenFromStorage();
    if (token){
        const expectedCode = 200;
        let arg;

        // En cas de présence des deux arguments, le fleaMarket prend les devants. En utilisant l'interface, ce cas ne devrait pas arriver mais on ne sait jamais
        if (fleaMarketId) {
            arg = `&fleaMarketId=${fleaMarketId}`;
        } else if (personId) {
            arg = `&personId=${personId}`;
        } else {
            console.error("La présence d'un argument de recherche est nécessaire : fleaMarketId ou personId");
            toast.error("La présence d'un argument de recherche est nécessaire : fleaMarketId ou personId");
        }

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/interest/search?limit=${limit}&page=${page}${arg}`,
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

export const createInterest = async (body) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 201;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/interest/`,
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

export const updateInterest = async (body) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/interest/`,
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

export const deleteInterest = async ({personId, fleaMarketId}) =>{
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 204;

        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/admin/interest/${fleaMarketId}/${personId}`,
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