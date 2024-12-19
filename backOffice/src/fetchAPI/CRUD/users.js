import { token, API_BASE_URL } from "./../login.js";

// la limite est 10 et la page 1 si pas précisé, pour rester cohérent avec l'api
const fetchUsersData = async (limit = 10, page = 1) => {
    const currentPageResponse = await fetch(
        `${API_BASE_URL}/admin/person/all?${limit}&page=${page}`, 
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
}

export const getUsersData = fetchUsersData;