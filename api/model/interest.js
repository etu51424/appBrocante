export const createInterest = async (SQLClient, {fleaMarketId, personId, isInterested, isDealer, participation}) => {
    const {rows} = await SQLClient.query("INSERT INTO interest (flea_market_id, person_id, is_interested, is_dealer, participation) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [fleaMarketId, personId, isInterested, isDealer, participation]);

    return rows[0]?.id;
}

export const readInterest = async (SQLClient, {fleaMarketId, personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM interest WHERE id = $1 AND person_id=$2", [fleaMarketId, personId]);
    return rows[0];
}

export const updateInterest = async (SQLClient) => {

}

export const deleteInterest = async (SQLClient) => {

}