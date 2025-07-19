import {exponentialRetry} from "../utils/exponentialRetry.js";
import {API_BASE_URL} from "../login.js";
import {statusCodesError} from "../utils/statusCode.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";
import toast from "react-hot-toast";

export const getAvatar = async (personId) => {
    const token = getTokenFromStorage();
    if (token) {
        let expectedCode = 200;
        return await exponentialRetry(async () => {
            const response = await fetch(
                `${API_BASE_URL}/client/avatar/${personId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                }
            );
            statusCodesError(response, expectedCode);

            if (response.status === expectedCode) {
                return await response.text();
            }
        });
    }
}