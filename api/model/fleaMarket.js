export const createFleaMarket = async (SQLClient, {address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount}) => {
    const {rows} = await SQLClient.query("INSERT INTO flea_market (address, date_start, date_end, title, theme, is_charity, average_rating, review_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount]);

    return rows[0]?.id;
}

export const readFleaMarket = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM flea_market WHERE id = $1", [id]);
    return rows[0];
}

export const updateFleaMarket = async (SQLClient) => {

}

export const deleteFleaMarket = async (SQLClient) => {

}