import {hash_verify} from "../utils/hash.js";
import {readPerson} from "./person.js";
import {readDealer} from "./dealer.js";
import {v4 as uuid} from 'uuid';

export const readPersonWithPassword = async (SQLClient, {personId, password}) => {
    console.log("entre dans readPersonWithPassword");
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
            send['isBanned'] = responses[0]?.is_timed_out;
        }
        else{
            send = {personId : null, status : null, isAdmin : null, isBanned: null};
        }
    }
    else {
        send = {personId : null, status : null, isAdmin : null, isBanned: null};
    }
    return send
}

export const createRecoveryCode = async (SQLClient, {personId}) => {
    let code = uuid();
    try{
        await SQLClient.query("UPDATE person SET recovery_code = $1 WHERE id = $2", [code, personId]);
        return code;
    } catch (err){
        throw new Error(`Error while creating recovery code : ${err.message}`);
    }
}

export const readRecoveryCode = async (SQLClient, {personId}) => {
    try{
        let {rows} = await SQLClient.query("SELECT recovery_code FROM person WHERE id= $1", [personId]);
        return rows[0];
    } catch (err) {
        throw new Error(`Error while reading recovery code : ${err.message}`);
    }
}

export const deleteRecoveryCode = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("UPDATE person SET recovery_code = NULL WHERE id = $2", [personId]);
    } catch (err) {
        throw new Error(`Error while deleting recovery code : ${err.message}`);
    }
}