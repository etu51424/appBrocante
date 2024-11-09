export const createSlot = async (SQLClient, {fleaMarketId, isAvailable, area}) => {
    const {rows} = await SQLClient.query("INSERT INTO slot (flea_market_id, is_available, area) VALUES ($1, $2, $3) RETURNING id",
        [fleaMarketId, isAvailable, area]);

    return rows[0]?.id;
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