export const createArticle = async (SQLClient, {dealerId, title, description, entry_date, cost, condition}) => {
    const {rows} = await SQLClient.query("INSERT INTO article (dealer_id, title, description, entry_date, cost, condition) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [dealerId, title, description, entry_date, cost, condition]);

    return rows[0]?.id;
}

export const readArticle = async (SQLClient, {id, dealerId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM article WHERE id = $1 AND dealer_id = $2", [id, dealerId]);
    return rows[0];
}

export const updateArticle = async (SQLClient, {id, dealer_id, title, description, entryDate, cost, condition}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (title){
        queryValues.push(title);
        querySet.push(`title=$${queryValues.length}`);
    }
    if (description){
        queryValues.push(description);
        querySet.push(`description=$${queryValues.length}`);
    }
    if (entryDate){
        queryValues.push(entryDate);
        querySet.push(`entry_date=$${queryValues.length}`);
    }
    if (cost){
        queryValues.push(cost);
        querySet.push(`cost=$${queryValues.length}`);
    }
    if (condition){
        queryValues.push(condition);
        querySet.push(`condition=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        queryValues.push(dealer_id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length-1} AND dealer_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteArticle = async (SQLClient, {id}) => {
    return await SQLClient.query("DELETE FROM article WHERE id = $1", [id]);
}

export const deleteArticleByDealer = async (SQLClient, {personId}) =>{
    return await SQLClient.query("DELETE FROM article WHERE dealer_id = $1", [personId]);
}