export const createArticle = async (SQLClient, {dealerId, title, description, entry_date, cost, condition}) => {
    let query = "INSERT INTO article ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (dealerId){
        dbColumns.push("dealer_id");
        queryValues.push(dealerId);
        querySet.push(`$${queryValues.length}`);
    }
    if (title){
        dbColumns.push("title");
        queryValues.push(title);
        querySet.push(`$${queryValues.length}`);
    }
    if (description){
        dbColumns.push("description");
        queryValues.push(description);
        querySet.push(`$${queryValues.length}`);
    }
    if (entry_date){
        dbColumns.push("entry_date");
        queryValues.push(entry_date);
        querySet.push(`$${queryValues.length}`);
    }
    if (cost){
        dbColumns.push("cost");
        queryValues.push(cost);
        querySet.push(`$${queryValues.length}`);
    }
    if (condition){
        dbColumns.push("condition");
        queryValues.push(condition);
        querySet.push(`$${queryValues.length}`);
    }
    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING id`;
        const {rows} = await SQLClient.query(query, queryValues);
        return rows[0]?.id;
    }
    else{
        throw new Error("No field given");
    }
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