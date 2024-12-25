import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

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
        let statusIsValid = await statusCodes(response);

        if (statusIsValid) return await response.json();
    }
    catch (e) {
        throw new Error(`Erreur lors de la récupération des articles : ${e.message}`);
    }
}

// recoit un identifiant numérique
export const createArticle = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/article`,
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
        throw new Error(`Erreur lors de la création de l'article : ${e.message}`);
    }
}

// ne recoit rien
export const updateArticle = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/article`,
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
        throw new Error(`Erreur lors de la modification de l'article : ${e.message}`);
    }
}

// ne recoit rien
export const deleteArticle = async (articleId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/article/${articleId}`,
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
        throw new Error(`Erreur lors de la supression d'un article : ${e.message}`);
    }
}