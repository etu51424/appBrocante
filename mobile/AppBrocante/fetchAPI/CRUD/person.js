import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

// recoit un tableau d'intérets
export const getPerson = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/person/me`,
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
export const createPerson = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/person`,
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
        throw new Error(`Erreur lors de la création de la person : ${e.message}`);
    }
}

// ne recoit rien
export const updatePerson = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/person`,
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
        throw new Error(`Erreur lors de la modification de la person : ${e.message}`);
    }
}

// ne recoit rien
export const deletePerson = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/person`,
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
        throw new Error(`Erreur lors de la récupération des intérets : ${e.message}`);
    }
}