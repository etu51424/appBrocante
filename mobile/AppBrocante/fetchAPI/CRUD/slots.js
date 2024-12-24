import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

// recoit un tableau d'intérets
export const getSlotsByFleaMarket = async (fleaMarketId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/slot/${fleaMarketId}`,
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
        throw new Error(`Erreur lors de la récupération des slots : ${e.message}`);
    }
}

export const createSlot = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/slot`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la création d'un slot : ${e.message}`);
    }
}

// ne recoit rien
export const updateSlot = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/slot`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la modification d'un slot : ${e.message}`);
    }
}