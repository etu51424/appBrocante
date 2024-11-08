export const createInterest = async (SQLClient) => {

}

export const readInterest = async (SQLClient, {fleaMarketId, personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1 AND person_id=$2", [fleaMarketId, personId]);
    return rows[0];
}

export const updateInterest = async (SQLClient) => {

}

export const deleteInterest = async (SQLClient) => {

}