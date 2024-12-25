import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

// recoit un tableau d'intérets
export const getinterestsByFleaMarket = async (fleaMarketId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/interest/${fleaMarketId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la récupération des intérets : ${e.message}`);
    }
}

// recoit un identifiant numérique
export const createInterest = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/interest`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la création de l'intéret : ${e.message}`);
    }
}

// ne recoit rien
export const updateInterest = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/interest`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la modification de l'intéret : ${e.message}`);
    }
}

// ne recoit rien
export const deleteInterestByFleaMarket = async (fleaMarketId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/interest/${fleaMarketId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la supression d'un intéret : ${e.message}`);
    }
}