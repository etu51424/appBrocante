import {API_BASE_URL } from "./../login.js";
import {exponentialRetry} from "../utils/exponentialRetry.js";
import {statusCodesError} from "../utils/statusCode.js";
import {getTokenFromStorage} from "../utils/tokenManagement.js";
import {TableTypes} from "../../utils/Defs.js";

export const verifyIdExistence = async ({id, idName, tableType}) => {
    const token = getTokenFromStorage();
    if (token) {
        const expectedCode = 200;
        let body = {};
        if (id) body.id = id;
        if (idName) body.idName = idName;
        if (tableType) {
            switch (tableType) {
                case TableTypes.DEALERS:
                    body.tableName = 'dealer';
                    break;
                case TableTypes.USERS:
                    body.tableName = 'person';
                    break;
                case TableTypes.ARTICLE:
                    body.tableName = 'article';
                    break;
                case TableTypes.FLEA_MARKETS:
                    body.tableName = 'flea_market';
                    break;
                case TableTypes.SLOTS:
                    body.tableName = 'slot';
                    break;
                case TableTypes.INTERESTS:
                    body.tableName = 'interest';
                    break;
                default:
                    console.error(`Table error : ${tableType}`);
            }
        }

        if (body.id && body.tableName) {
            return await exponentialRetry(async () => {
                const response = await fetch(
                    `${API_BASE_URL}/admin/common/`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    }
                );
                statusCodesError(response, expectedCode);

                if (response.status === expectedCode) {
                    // devrait être true ou false
                    return await response.json();
                }
            });
        }
        else{
            console.error(`No id or table name given : ${id}, ${tableType}`);
        }
    }
}