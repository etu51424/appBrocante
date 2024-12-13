export const createDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    let query = "INSERT INTO dealer ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (personId !== undefined){
        dbColumns.push("person_id");
        queryValues.push(personId);
        querySet.push(`$${queryValues.length}`);
    }
    if (type !== undefined){
        dbColumns.push("type");
        queryValues.push(type);
        querySet.push(`$${queryValues.length}`);
    }
    if (description !== undefined){
        dbColumns.push("description");
        queryValues.push(description);
        querySet.push(`$${queryValues.length}`);
    }
    if (signupDate !== undefined){
        dbColumns.push("signup_date");
        queryValues.push(signupDate);
        querySet.push(`$${queryValues.length}`);
    }
    if (averageRating !== undefined){
        dbColumns.push("average_rating");
        queryValues.push(averageRating);
        querySet.push(`$${queryValues.length}`);
    }
    if (reviewCount !== undefined){
        dbColumns.push("review_count");
        queryValues.push(reviewCount);
        querySet.push(`$${queryValues.length}`);
    }
    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING person_id`;
        try {
            const {rows} = await SQLClient.query(query, queryValues);
            return rows[0]?.person_id;
        } catch (err){
            throw new Error(`Error while creating dealer : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const readDealer = async (SQLClient, {personId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM dealer WHERE person_id = $1", [personId]);
        return rows[0];
    } catch (err){
        throw new Error(`Error while reading dealer : ${err.message}`);
    }
}

export const readAllDealers = async (SQLClient) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM dealer");
        return rows;
    } catch (err){
        throw new Error(`Error while reading all dealers : ${err.message}`);
    }
}

export const updateDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    let query = "UPDATE dealer SET ";
    const querySet = [];
    const queryValues = [];
    if (type !== undefined){
        queryValues.push(type);
        querySet.push(`type=$${queryValues.length}`);
    }
    if (description !== undefined){
        queryValues.push(description);
        querySet.push(`description=$${queryValues.length}`);
    }
    if (signupDate !== undefined){
        queryValues.push(signupDate);
        querySet.push(`signup_date=$${queryValues.length}`);
    }
    if (averageRating !== undefined){
        queryValues.push(averageRating);
        querySet.push(`average_rating=$${queryValues.length}`);
    }
    if (reviewCount !== undefined){
        queryValues.push(reviewCount);
        querySet.push(`review_count=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(personId);
        query += `${querySet.join(", ")} WHERE person_id = $${queryValues.length}`;
        try {
            return await SQLClient.query(query, queryValues);
        } catch (err){
            throw new Error(`Error while updating dealer : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteDealer = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("DELETE FROM dealer WHERE person_id = $1", [personId]);
    } catch (err){
        throw new Error(`Error while deleting dealer : ${err.message}`);
    }
}