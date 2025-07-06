import { API_BASE_URL, token} from "./../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";

const fetchFleaMarketsDataWithinDates = async (dateStart = '2024-01-01', dateEnd = '2026-01-01') => {
    const expectedCode = 200;
    return await exponentialRetry(async () =>{
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
        statusCodesError(response, expectedCode);

        if (response.status === expectedCode){
            return await response.json();
        }
    });
}

export const getFMDataWithinDates = fetchFleaMarketsDataWithinDates;

