import { API_BASE_URL } from "./../login.js";

const fetchFleaMarketsDataWithinDates = async (token, dateStart = '2024-01-01', dateEnd = '2026-01-01') => {
    console.log("reçoit dateStart" + dateStart +" et " + dateEnd);

    const response = await fetch(
        `${API_BASE_URL}/client/fleaMarket/inDates?dateStart=${dateStart}&dateEnd=${dateEnd}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`Echec à fetch les objets : ${response.statusText}`);
    } else {
        const data = await response.json();
        //console.log(data);
        return data;
    }
}

export const getFMDataWithinDates = fetchFleaMarketsDataWithinDates;

