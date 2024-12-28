import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

export const getDealer = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/dealer/me`,
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
        throw new Error(`Erreur lors de la récupération du profil : ${e.message}`);
    }
}

// recoit un identifiant numérique
export const createDealer = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/dealer`,
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
        throw new Error(`Erreur lors de la création du dealer : ${e.message}`);
    }
}

// ne recoit rien
export const updateDealer = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/dealer`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        return await statusCodes(response);
    }
    catch (e) {
        throw new Error(`Erreur lors de la modification du dealer : ${e.message}`);
    }
}

// ne recoit rien
export const deleteDealer = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/dealer`,
            {
                method: "DELETE",
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
        throw new Error(`Erreur lors de la supression d'un dealer : ${e.message}`);
    }
}