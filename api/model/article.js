export const createArticle = async (SQLClient, {dealerId, title, description, entry_date, cost, condition}) => {
    const {rows} = await SQLClient.query("INSERT INTO article (dealer_id, title, description, entry_date, cost, condition) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [dealerId, title, description, entry_date, cost, condition]);

    return rows[0]?.id;
}

export const readArticle = async (SQLClient, {id, dealerId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM article WHERE id = $1 AND dealer_id = $2", [id, dealerId]);
    return rows[0];
}

export const updateArticle = async (SQLClient) => {

}

export const deleteArticle = async (SQLClient) => {

}