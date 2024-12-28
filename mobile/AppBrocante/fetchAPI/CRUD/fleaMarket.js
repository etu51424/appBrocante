import {API_BASE_URL, USER_TOKEN} from "../login";
import {statusCodes} from "../utils/statusCodes";

// recoit un tableau de flea markets
export const getAllFleaMarketsInRange = async (range) => {
    try {
        range = range || 10
        const response = await fetch(
            `${API_BASE_URL}/client/fleaMarket/inRange?range=${range}`,
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
        throw new Error(`Erreur lors de la récupération des brocantes avec une distance : ${e.message}`);
    }
}

// recoit un tableau de flea markets
export const getAllFleaMarketsInDates = async (startDate, endDate) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/fleaMarket/inDates?dateStart=${startDate}&dateEnd=${endDate}`,
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
        throw new Error(`Erreur lors de la récupération des brocantes entre deux dates : ${e.message}`);
    }
}

// recoit un identifiant numérique
export const createFleaMarket = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/fleaMarket`,
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
        throw new Error(`Erreur lors de la création de la brocante : ${e.message}`);
    }
}

// ne recoit rien
export const updateFleaMarket = async (body) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dealer/fleaMarket`,
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
        throw new Error(`Erreur lors de la modification de la brocante : ${e.message}`);
    }
}