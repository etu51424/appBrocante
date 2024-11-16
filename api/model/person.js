import {pool} from "../database/dbAccess.js";
import {deleteDealer} from "./dealer.js";
import {deleteInterestByPerson} from "./interest.js";

export const createPerson = async (SQLClient, {name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profilePicture}) => {
    const {rows} = await SQLClient.query("INSERT INTO person (name, first_name, last_name, address, phone_number, email, last_edit_date, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [name, firstName, lastName, address, phoneNumber, email, lastEditDate, profilePicture]);

    return rows[0]?.id;
}

export const readPerson = async (SQLClient, {personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [personId]);
    return rows[0];
}

export const readPersonWithPassword = async (SQLClient, {personId, password}) => {
    const responses = await Promise.all([
        readPerson(SQLClient, {personId}),
    ]);
    if (responses[0]) {
        return password === responses[0].password ?
            {personId : responses[0].id, status:"user"} :
            {personId : null, status : null};
    }
    else {
        return {personId : null, status : null};
    }
}

export const updatePerson = async (SQLClient, {id, name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profilePicture}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (name){
        queryValues.push(name);
        querySet.push(`name=$${queryValues.length}`);
    }
    if (firstName){
        queryValues.push(firstName);
        querySet.push(`first_name=$${queryValues.length}`);
    }
    if (lastName){
        queryValues.push(lastName);
        querySet.push(`last_name=$${queryValues.length}`);
    }
    if (address){
        queryValues.push(address);
        querySet.push(`address=$${queryValues.length}`);
    }
    if (phoneNumber){
        queryValues.push(phoneNumber);
        querySet.push(`phone_number=$${queryValues.length}`);
    }
    if (email){
        queryValues.push(email);
        querySet.push(`email=$${queryValues.length}`);
    }
    if (lastEditDate){
        queryValues.push(lastEditDate);
        querySet.push(`last_edit_date=$${queryValues.length}`);
    }
    if (profilePicture){
        queryValues.push(profilePicture);
        querySet.push(`profile_picture=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }
    else{
        throw new Error("No field given");
    }
}

export const deletePerson = async (SQLClient, {personId}) => {
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteDealer({personId}, SQLClient);
        await deleteInterestByPerson(SQLClient, {personId})
        await SQLClient.query("DELETE FROM person WHERE id = $1", [personId]);

        await SQLClient.query("COMMIT");

    } catch (err){
        console.error(err);
        try{
            if(SQLClient){
                SQLClient.query("ROLLBACK");
            }
        } catch (err){
            console.error(err);
        } finally {
            throw new Error("Erreur dans le modelPerson");
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}


