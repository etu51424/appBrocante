import {API_BASE_URL, USER_TOKEN} from "../login";

// recoit un tableau d'articles
export const getArticlesByDealer = async (dealerId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/article/${dealerId}`,
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
        throw new Error(`Erreur lors de la récupération des articles : ${e.message}`);
    }
}