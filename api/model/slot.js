export const createSlot = async (SQLClient, {fleaMarketId, isAvailable, area}) => {
    let query = "INSERT INTO slot ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (area){
        dbColumns.push("area");
        queryValues.push(area);
        querySet.push(`$${queryValues.length}`);
    }
    if (fleaMarketId) {
        dbColumns.push("flea_market_id");
        queryValues.push(fleaMarketId);
        querySet.push(`$${queryValues.length}`);
    }
    if (isAvailable) {
        dbColumns.push("is_available");
        queryValues.push(isAvailable);
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

export const readSlot = async (SQLClient, {id, fleaMarketId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM slot WHERE id = $1 AND flea_market_id=$2", [id, fleaMarketId]);
    return rows[0];
}

export const updateSlot = async (SQLClient, {id, fleaMarketId, isAvailable, area}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (isAvailable){
        queryValues.push(isAvailable);
        querySet.push(`is_available=$${queryValues.length}`);
    }
    if (area){
        queryValues.push(area);
        querySet.push(`area=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        queryValues.push(fleaMarketId);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length-1} AND flea_market_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteSlot = async (SQLClient, {id, fleaMarketId}) => {
    return await SQLClient.query("DELETE FROM slot WHERE id = $1 AND flea_market_id= $2", [id, fleaMarketId]);
}

export const deleteSlotByFleaMarket = async (SQLClient, {fleaMarketId}) => {
    return await SQLClient.query("DELETE FROM slot WHERE flea_market_id = $1", [fleaMarketId]);
}