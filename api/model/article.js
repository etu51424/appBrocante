export const createArticle = async (SQLClient) => {

}

export const readArticle = async (SQLClient, {id, dealerId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1 AND dealer_id = $2", [id, dealerId]);
    return rows[0];
}

export const updateArticle = async (SQLClient) => {

}

export const deleteArticle = async (SQLClient) => {

}