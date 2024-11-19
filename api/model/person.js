import * as argon2id from "argon2";

export const createPerson = async (SQLClient, {name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profile_picture, password}) => {
    let query = "INSERT INTO person ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (firstName){
        dbColumns.push("first_name");
        queryValues.push(firstName);
        querySet.push(`$${queryValues.length}`);
    }
    if (lastName){
        dbColumns.push("last_name");
        queryValues.push(lastName);
        querySet.push(`$${queryValues.length}`);
    }
    if (address){
        dbColumns.push("address");
        queryValues.push(address);
        querySet.push(`$${queryValues.length}`);
    }
    if (phoneNumber){
        dbColumns.push("phone_number");
        queryValues.push(phoneNumber);
        querySet.push(`$${queryValues.length}`);
    }
    if (lastEditDate){
        dbColumns.push("last_edit_date");
        queryValues.push(lastEditDate);
        querySet.push(`$${queryValues.length}`);
    }
    if (profile_picture){
        dbColumns.push("profile_picture");
        queryValues.push(profile_picture);
        querySet.push(`$${queryValues.length}`);
    }
    if (name) {
        dbColumns.push("name");
        queryValues.push(name);
        querySet.push(`$${queryValues.length}`);
    }
    if (email) {
        dbColumns.push("email");
        queryValues.push(email);
        querySet.push(`$${queryValues.length}`);
    }
    if (password) {
        dbColumns.push("password");
        queryValues.push(password);
        querySet.push(`$${queryValues.length}`);
    }

    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING id`;
        const {rows} = await SQLClient.query(query, queryValues);
        return rows[0]?.id;
    }
    else{
        throw new Error("No field given");
    }
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
        return await argon2id.verify(responses[0]?.password, password, {secret : Buffer.from(process.env.PEPPER)}) ?
            {personId : responses[0].id, status:"user"} :
            {personId : null, status : null};
    }
    else {
        return {personId : null, status : null};
    }
}

export const updatePerson = async (SQLClient, {id, name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profilePicture, password}) => {
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
    if (password){
        queryValues.push(password);
        querySet.push(`password=$${queryValues.length}`);
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
    return await SQLClient.query("DELETE FROM person WHERE id=$1",[personId]);
}


