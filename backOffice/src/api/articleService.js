const API_BASE_URL = "http://localhost:3001/api/v1";

export const fetchArticles = async (token) => {
    console.log("réussis à rentrer dans fetchArticles");
    const response = await fetch(
        `${API_BASE_URL}/article`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
);
    //le status n'est pas 200 à 299 (success)
    if (!response.ok) {
        console.log(`Erreur de login.`);
    }
    console.log(`Status : ${response.status}`);

    return response.json(); // Retourne les articles
};