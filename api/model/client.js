import {hash_verify} from "../utils/utils.js";
import {readPerson} from "./person.js";
import {readDealer} from "./dealer.js";

export const readPersonWithPassword = async (SQLClient, {personId, password}) => {
    const responses = await Promise.all([
        readPerson(SQLClient, {personId}),
        readDealer(SQLClient, {personId})
    ]);
    let send = {};
    if (responses[0]) {
        if (await hash_verify(responses[0].password, password)) {
            send['personId'] = responses[0].id;
            if (responses[1]) {
                send['status'] = "dealer";
            } else {
                send['status'] = "client";
            }
            send['isAdmin'] = responses[0]?.is_admin;
        }
        else{
            send = {personId : null, status : null, isAdmin : null};
        }
    }
    else {
        send = {personId : null, status : null, isAdmin : null};
    }
    return send
}