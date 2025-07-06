import { API_BASE_URL } from "../login.js";
import {statusCodesError} from "../utils/statusCode.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";

export const getRecoveryEmail = async (personId) => {
    let expectedCode = 201;
    return await exponentialRetry(async () => {
        const response = await fetch(
            `${API_BASE_URL}/client/security/${personId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        statusCodesError(response, expectedCode);

        return response.status === expectedCode;
    });
}

// ne recoit rien
export const validateRecoveryCode = async (body) => {
    const expectedCode = 200;
    return await exponentialRetry(async () => {
        const response = await fetch(
            `${API_BASE_URL}/client/security`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        statusCodesError(response, expectedCode);

        return response.status === expectedCode;
    })

}