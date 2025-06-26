import { API_BASE_URL, token } from "./../login.js";

// la limite est 10 et la page 1 si pas précisé, pour rester cohérent avec l'api
export const getFleaMarketsData = async (token, limit = 10, page = 1) => {
    console.log("fetchFleaMarketsData reçoit token");
    const currentPageResponse = await fetch(
        `${API_BASE_URL}/admin/fleaMarket/all?limit=${limit}&page=${page}`,
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
        `${API_BASE_URL}/admin/fleaMarket/all?$limit={limit}&page=${page+1}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (currentPageResponse.status !== 200) {
        throw new Error(`Echec à fetch les objets : ${response.statusText}`);
    } else {
        const data = await currentPageResponse.json();
        const noMoreData = nextPageResponse.status === 404;

        return { data, noMoreData };
    }
}

export const createFleaMarketData = async (body) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/fleaMarket/`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body)
        }
    );

    if (response.status !== 201) {
        throw new Error(`Echec à la création : ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export const updateFleaMarket = async (body) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/fleaMarket/`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body)
        }
    );

    if (response.status !== 204) {
        throw new Error(`Echec à la modification : ${response.statusText}`);
    }
    else{
        return "Article updated successfully.";
    }
}

export const deleteFleaMarket = async (id) =>{
    const response = await fetch(
        `${API_BASE_URL}/admin/fleaMarket/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 204) {
        throw new Error(`Echec à la supression : ${response.statusText}`);
    }
    else{
        return "Article deleted successfully.";
    }
}
