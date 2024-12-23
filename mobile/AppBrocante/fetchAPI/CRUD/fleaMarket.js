import {API_BASE_URL, USER_TOKEN} from "../login";

// recoit un identifiant numérique
export const createFleaMarket = async (body) => {
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
        return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la création du dealer : ${e.message}`);
    }
}