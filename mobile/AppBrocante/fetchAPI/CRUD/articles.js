import {API_BASE_URL, USER_TOKEN} from "../login";

export const getArticlesByDealer = async (dealerId) => {
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