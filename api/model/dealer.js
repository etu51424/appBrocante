export const createDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    const {rows} = await SQLClient.query("INSERT INTO dealer (person_id, type, description, signup_date, average_rating, review_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [personId, type, description, signupDate, averageRating, reviewCount]);

    return rows[0]?.id;
}

export const readDealer = async (SQLClient, {personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM dealer WHERE id = $1", [personId]);
    return rows[0];
}

export const updateDealer = async (SQLClient) => {

}

export const deleteDealer = async (SQLClient) => {

}