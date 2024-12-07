export const createArticle = async (SQLClient, {dealerId, title, description, entry_date, cost, condition}) => {
    let query = "INSERT INTO article ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (dealerId !== undefined){
        dbColumns.push("dealer_id");
        queryValues.push(dealerId);
        querySet.push(`$${queryValues.length}`);
    }
    if (title !== undefined){
        dbColumns.push("title");
        queryValues.push(title);
        querySet.push(`$${queryValues.length}`);
    }
    if (description !== undefined){
        dbColumns.push("description");
        queryValues.push(description);
        querySet.push(`$${queryValues.length}`);
    }
    if (entry_date !== undefined){
        dbColumns.push("entry_date");
        queryValues.push(entry_date);
        querySet.push(`$${queryValues.length}`);
    }
    if (cost !== undefined){
        dbColumns.push("cost");
        queryValues.push(cost);
        querySet.push(`$${queryValues.length}`);
    }
    if (condition !== undefined){
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

export const readArticle = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM article WHERE id = $1", [id]);
    return rows[0];
}

export const readAllArticles = async (SQLClient) => {
    console.log("readAllArticles");
    //n'obtenir que la propriété rows, les contenant
    const {rows} = await SQLClient.query("SELECT * FROM article");
    console.log("In model" + rows[2].title + "In model");
    return rows;
}

export const updateArticle = async (SQLClient, {id, dealerId, title, description, entryDate, cost, condition}) => {
    let query = "UPDATE article SET ";
    const querySet = [];
    const queryValues = [];
    if (title !== undefined){
        queryValues.push(title);
        querySet.push(`title=$${queryValues.length}`);
    }
    if (description !== undefined){
        queryValues.push(description);
        querySet.push(`description=$${queryValues.length}`);
    }
    if (entryDate !== undefined){
        queryValues.push(entryDate);
        querySet.push(`entry_date=$${queryValues.length}`);
    }
    if (cost !== undefined){
        queryValues.push(cost);
        querySet.push(`cost=$${queryValues.length}`);
    }
    if (condition !== undefined){
        queryValues.push(condition);
        querySet.push(`condition=$${queryValues.length}`);
    }
    if (dealerId !== undefined){
        queryValues.push(dealerId);
        querySet.push(`dealer_id=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
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