export const createSlot = async (SQLClient, {fleaMarketId, isAvailable, area}) => {
    const {rows} = await SQLClient.query("INSERT INTO slot (flea_market_id, is_available, area) VALUES ($1, $2, $3) RETURNING id",
        [fleaMarketId, isAvailable, area]);

    return rows[0]?.id;
}

export const readSlot = async (SQLClient, {id, fleaMarketId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM slot WHERE id = $1 AND flea_market_id=$2", [id, fleaMarketId]);
    return rows[0];
}

export const updateSlot = async (SQLClient) => {

}

export const deleteSlot = async (SQLClient) => {

}