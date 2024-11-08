export const createFleaMarket = async (SQLClient) => {

}

export const readFleaMarket = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [id]);
    return rows[0];
}

export const updateFleaMarket = async (SQLClient) => {

}

export const deleteFleaMarket = async (SQLClient) => {

}