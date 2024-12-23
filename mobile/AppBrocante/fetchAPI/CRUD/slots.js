import {API_BASE_URL, USER_TOKEN} from "../login";

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
        return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la récupération des slots : ${e.message}`);
    }
}