import {API_BASE_URL, USER_TOKEN} from "./login";
import {statusCodes} from "./utils/statusCodes";

export const getAvatar = async (personId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/avatar/${personId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.text();
    }
    catch (e) {
        throw new Error(`Erreur lors de la récupération de l'avatar : ${e.message}`);
    }
}

export const getSelfAvatar = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/avatar/me`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        let statusIsValid = await statusCodes(response);
        if (statusIsValid) return await response.text();
    }
    catch (e) {
        throw new Error(`Erreur lors de la récupération de l'avatar : ${e.message}`);
    }
}

// recoit un identifiant numérique
export const createAvatar = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/avatar`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${USER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: body,
            }
        );
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de l'upload de l'avatar : ${e.message}`);
    }
}