export const createDealer = async (SQLClient) => {

}

export const readDealer = async (SQLClient, {personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [personId]);
    return rows[0];
}

export const updateDealer = async (SQLClient) => {

}

export const deleteArticle = async (SQLClient) => {

}