export const createSlot = async (SQLClient) => {

}

export const readSlot = async (SQLClient, {id, fleaMarketId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1 AND flea_market_id=$2", [id, fleaMarketId]);
    return rows[0];
}

export const updateSlot = async (SQLClient) => {

}

export const deleteSlot = async (SQLClient) => {

}