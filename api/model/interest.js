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
        const {rows} = await SQLClient.query(query, queryValues);
        return rows[0]?.flea_market_id;
    }
    else{
        throw new Error("No field given");
    }
}

export const readInterest = async (SQLClient, {fleaMarketId, personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM interest WHERE id = $1 AND person_id=$2", [fleaMarketId, personId]);
    return rows[0];
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
        return await SQLClient.query(query, queryValues);
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteInterest = async (SQLClient, {fleaMarketId, personId}) => {
    return await SQLClient.query("DELETE FROM interest WHERE flea_market_id=$1 AND person_id = $2", [fleaMarketId, personId]);
}

export const deleteInterestByPerson = async (SQLClient, {personId}) => {
    return await SQLClient.query("DELETE FROM interest WHERE person_id = $1", [personId]);
}

export const deleteInterestByFleaMarket = async (SQLClient, {fleaMarketId}) => {
    return await SQLClient.query("DELETE FROM interest WHERE flea_market_id = $1", [fleaMarketId]);
}

