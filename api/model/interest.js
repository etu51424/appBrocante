export const createInterest = async (SQLClient, {fleaMarketId, personId, isInterested, isDealer, participation}) => {
    const {rows} = await SQLClient.query("INSERT INTO interest (flea_market_id, person_id, is_interested, is_dealer, participation) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [fleaMarketId, personId, isInterested, isDealer, participation]);

    return rows[0]?.id;
}

export const readInterest = async (SQLClient, {fleaMarketId, personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM interest WHERE id = $1 AND person_id=$2", [fleaMarketId, personId]);
    return rows[0];
}

export const updateInterest = async (SQLClient, {fleaMarketId, personId, isInterested, isDealer, participation}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (isInterested){
        queryValues.push(isInterested);
        querySet.push(`is_interested=$${queryValues.length}`);
    }
    if (isDealer){
        queryValues.push(isDealer);
        querySet.push(`is_dealer=$${queryValues.length}`);
    }
    if (participation){
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
    return await SQLClient.query("DELETE FROM interest WHERE flea_market_id, person_id = $2", [fleaMarketId, personId]);
}

export const deleteInterestByPerson = async (SQLClient, {personId}) => {
    return await SQLClient.query("DELETE FROM interest WHERE person_id = $1", [personId]);
}

export const deleteInterestByFleaMarket = async (SQLClient, {fleaMarketId}) => {
    return await SQLClient.query("DELETE FROM interest WHERE flea_market_id = $1", [fleaMarketId]);
}

