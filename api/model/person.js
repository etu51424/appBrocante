// crée un utilisateur
export const createPerson = async (SQLClient, {name, firstName, lastName, address,
        phoneNumber, email, lastEditDate, profilePicture}) => {
    const {rows} = await SQLClient.query("INSERT INTO person (name, first_name, last_name, address, phone_number, email, last_edit_date, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [name, firstName, lastName, address, phoneNumber, email, lastEditDate, profilePicture]);

    return rows[0]?.id;
}

// renvoie un utilisateur par l'identifiant
export const readPerson = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [id]);
    return rows[0];
}

// update un utilisateur
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

// supprime un utilisateur par l'identifiant
export const deletePerson = async (SQLClient, {id}) => {
    return await SQLClient.query("DELETE FROM person WHERE id = $1", [id]);
}


