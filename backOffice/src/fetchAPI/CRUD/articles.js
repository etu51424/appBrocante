import { token } from "./../login.js";

const API_BASE_URL = "http://localhost:3001/api/v1";

// la limite est 10 et la page 1 si pas précisé, pour rester cohérent avec l'api
const fetchArticlesData = async (limit = 10, page = 1) => {
    const currentPageResponse = await fetch(
        `${API_BASE_URL}/admin/article/all?${limit}&page=${page}`, 
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    //Verifier si la page d'après existe, pour déterminer si on doit proposer ou non à l'useur d'accéder à la page d'après
    //Moyen d'optimiser: ne pas fetch celle ci si nb données de la table précédente < limit
    const nextPageResponse = await fetch(
        `${API_BASE_URL}/admin/article/all?${limit}&page=${page+1}`, 
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!currentPageResponse.ok) {
        throw new Error(`Echec à fetch les objets : ${response.statusText}`);
    } else {
        const data = await currentPageResponse.json();
        console.log(data);
        const noMoreData = nextPageResponse.status === 404;

        return { data, noMoreData }; // Successful fetch
    }
}

export const getArticlesData = fetchArticlesData;


/*
// construire la requete pour recup les articles
const articlesResponse = await fetch(`${API_BASE_URL}/admin/article/all`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const getArticlesData = await articlesResponse.json();
*/