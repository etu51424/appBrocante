export const createInterest = async (SQLClient, {fleaMarketId, personId, isInterested, isDealer, participation}) => {
    let query = "INSERT INTO interest ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (fleaMarketId !== undefined){
        dbColumns.push("flea_market_id");
        queryValues.push(fleaMarketId);
        querySet.push(`$${queryValues.length}`);
    }
    if (personId !== undefined){
        dbColumns.push("person_id");
        queryValues.push(personId);
        querySet.push(`$${queryValues.length}`);
    }
    if (isInterested !== undefined){
        dbColumns.push("is_interested");
        queryValues.push(isInterested);
        querySet.push(`$${queryValues.length}`);
    }
    if (isDealer !== undefined){
        dbColumns.push("is_dealer");
        queryValues.push(isDealer);
        querySet.push(`$${queryValues.length}`);
    }
    if (participation !== undefined){
        dbColumns.push("participation");
        queryValues.push(participation);
        querySet.push(`$${queryValues.length}`);
    }
    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING flea_market_id`;
        try {
            const {rows} = await SQLClient.query(query, queryValues);
            return rows[0]?.flea_market_id;
        } catch (err) {
            throw new Error(`Error while creating interest : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const readInterest = async (SQLClient, {fleaMarketId, personId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM interest WHERE flea_market_id = $1 AND person_id=$2", [fleaMarketId, personId]);
        return rows[0];
    } catch (err) {
        throw new Error(`Error while reading interest : ${err.message}`);
    }
}

export const readAllInterest = async (SQLClient, {limit, offset}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM interest LIMIT $1 OFFSET $2", [limit, offset]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all interest : ${err.message}`);
    }
}

export const readAllInterestByFleaMarketId = async (SQLClient, {fleaMarketId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM interest WHERE flea_market_id = $1", [fleaMarketId]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all interest by fleaMarketId : ${err.message}`);
    }
}

export const updateInterest = async (SQLClient, {fleaMarketId, personId, isInterested, isDealer, participation}) => {
    let query = "UPDATE interest SET ";
    const querySet = [];
    const queryValues = [];
    if (isInterested !== undefined){
        queryValues.push(isInterested);
        querySet.push(`is_interested=$${queryValues.length}`);
    }
    if (isDealer !== undefined){
        queryValues.push(isDealer);
        querySet.push(`is_dealer=$${queryValues.length}`);
    }
    if (participation !== undefined){
        queryValues.push(participation);
        querySet.push(`participation=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(fleaMarketId);
        queryValues.push(personId);
        query += `${querySet.join(", ")} WHERE flea_market_id = $${queryValues.length-1} AND person_id=$${queryValues.length}`;
        try {
            return await SQLClient.query(query, queryValues);
        } catch (err) {
            throw new Error(`Error while updating interest : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteInterest = async (SQLClient, {fleaMarketId, personId}) => {
    try {
        return await SQLClient.query("DELETE FROM interest WHERE flea_market_id=$1 AND person_id = $2", [fleaMarketId, personId]);
    } catch (err) {
        throw new Error(`Error while deleting interest : ${err.message}`);
    }
}

export const deleteInterestByPerson = async (SQLClient, {personId}) => {
    try {
        return await SQLClient.query("DELETE FROM interest WHERE person_id = $1", [personId]);
    } catch (err) {
        throw new Error(`Error while deleting interest by person : ${err.message}`);
    }
}

export const deleteInterestByFleaMarket = async (SQLClient, {fleaMarketId}) => {
    try {
        return await SQLClient.query("DELETE FROM interest WHERE flea_market_id = $1", [fleaMarketId]);
    } catch (err) {
        throw new Error(`Error while deleting interest by flea market : ${err.message}`);
    }
}

