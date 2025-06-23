import { API_BASE_URL } from "../login.js";
import {statusCodes} from "../utils/statusCode.js";

export const getRecoveryEmail = async (personId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/client/security/${personId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        return await statusCodes(response);
    }
    catch (e) {
        throw new Error(`Erreur lors de la réception d'un code de récupération : ${e.message}`);
    }
}

// ne recoit rien
export const validateRecoveryCode = async (body) => {
    try {
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
        return await statusCodes(response);
    }
    catch (e) {
        console.error(`Erreur lors de la vérification d'un code de récupération : ${e.message}`);
    }
}