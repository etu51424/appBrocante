import {personId} from "../middleware/validator/schemas/person.js";

export const createPerson = async (SQLClient, {name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profile_picture, password}) => {
    let query = "INSERT INTO person ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (firstName !== undefined){
        dbColumns.push("first_name");
        queryValues.push(firstName);
        querySet.push(`$${queryValues.length}`);
    }
    if (lastName !== undefined){
        dbColumns.push("last_name");
        queryValues.push(lastName);
        querySet.push(`$${queryValues.length}`);
    }
    if (address !== undefined){
        dbColumns.push("address");
        queryValues.push(address);
        querySet.push(`$${queryValues.length}`);
    }
    if (phoneNumber !== undefined){
        dbColumns.push("phone_number");
        queryValues.push(phoneNumber);
        querySet.push(`$${queryValues.length}`);
    }
    if (lastEditDate !== undefined){
        dbColumns.push("last_edit_date");
        queryValues.push(lastEditDate);
        querySet.push(`$${queryValues.length}`);
    }
    if (profile_picture !== undefined){
        dbColumns.push("profile_picture");
        queryValues.push(profile_picture);
        querySet.push(`$${queryValues.length}`);
    }
    if (name !== undefined) {
        dbColumns.push("name");
        queryValues.push(name);
        querySet.push(`$${queryValues.length}`);
    }
    if (email !== undefined) {
        dbColumns.push("email");
        queryValues.push(email);
        querySet.push(`$${queryValues.length}`);
    }
    if (password !== undefined) {
        dbColumns.push("password");
        queryValues.push(password);
        querySet.push(`$${queryValues.length}`);
    }

    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING id`;
        try {
            const {rows} = await SQLClient.query(query, queryValues);
            return rows[0]?.id;
        }
        catch(err){
            throw new Error(`Error while creating in database : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const readPerson = async (SQLClient, {personId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [personId]);
        return rows[0];
    }
    catch (err){
        throw new Error(`Error while reading in database : ${err.message}`);
    }
}

export const updatePerson = async (SQLClient, {personId, name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profilePicture, password}) => {

    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (name !== undefined){
        queryValues.push(name);
        querySet.push(`name=$${queryValues.length}`);
    }
    if (firstName !== undefined){
        queryValues.push(firstName);
        querySet.push(`first_name=$${queryValues.length}`);
    }
    if (lastName !== undefined){
        queryValues.push(lastName);
        querySet.push(`last_name=$${queryValues.length}`);
    }
    if (address !== undefined){
        queryValues.push(address);
        querySet.push(`address=$${queryValues.length}`);
    }
    if (phoneNumber !== undefined){
        queryValues.push(phoneNumber);
        querySet.push(`phone_number=$${queryValues.length}`);
    }
    if (email !== undefined){
        queryValues.push(email);
        querySet.push(`email=$${queryValues.length}`);
    }
    if (lastEditDate !== undefined){
        queryValues.push(lastEditDate);
        querySet.push(`last_edit_date=$${queryValues.length}`);
    }
    if (profilePicture !== undefined){
        queryValues.push(profilePicture);
        querySet.push(`profile_picture=$${queryValues.length}`);
    }
    if (password !== undefined){
        queryValues.push(password);
        querySet.push(`password=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(personId);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        try {
            return await SQLClient.query(query, queryValues);
        } catch (err){
            throw new Error(`Error while updating in database : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const deletePerson = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("DELETE FROM person WHERE id=$1", [personId]);
    } catch (err) {
        throw new Error(`Error while deleting in database : ${err.message}`);
    }
}

export const promotePersonAdmin = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("UPDATE person SET is_admin=true WHERE id = $1", [personId]);
    } catch (err) {
        throw new Error(`Error while promoting in database : ${err.message}`);
    }
}

export const demotePersonAdmin = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("UPDATE person SET is_admin=false WHERE id = $1", [personId]);
    } catch (err) {
        throw new Error(`Error while demoting in database : ${err.message}`);
    }
}



