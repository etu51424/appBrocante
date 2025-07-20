export const createArticle = async (SQLClient, {personId, title, description, entry_date, cost, condition}) => {
    let query = "INSERT INTO article ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (personId !== undefined){
        dbColumns.push("dealer_id");
        queryValues.push(personId);
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
        try {
            const {rows} = await SQLClient.query(query, queryValues);
            return rows[0]?.id;
        } catch (err){
            throw new Error(`Error while creating article : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const readArticle = async (SQLClient, {id}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM article WHERE id = $1", [id]);
        return rows[0];
    } catch (err) {
        throw new Error(`Error while reading article : ${err.message}`);
    }
}

export const readAllArticles = async (SQLClient, {limit, offset}) => {
    //n'obtenir que la propriété rows, les contenant
    try {
        const {rows} = await SQLClient.query("SELECT * FROM article LIMIT $1 OFFSET $2", [limit, offset]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all article : ${err.message}`);
    }
}

export const readAllArticlesByTitle = async (SQLClient, {limit, offset, title}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM article WHERE title ILIKE $1 LIMIT $2 OFFSET $3", [`${title}%`,limit, offset]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all article by title : ${err.message}`);
    }
}

export const readAllArticlesByPersonId = async (SQLClient, {personId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM article WHERE dealer_id = $1", [personId]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all articles by personID : ${err.message}`);
    }
}

export const updateArticle = async (SQLClient, {id, personId, title, description, entryDate, cost, condition}) => {
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
    if (personId !== undefined){
        queryValues.push(personId);
        querySet.push(`dealer_id=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        try {
            return await SQLClient.query(query, queryValues);
        } catch (err) {
            throw new Error(`Error while updating article : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteArticle = async (SQLClient, {id}) => {
    try {
        return await SQLClient.query("DELETE FROM article WHERE id = $1", [id]);
    } catch (err) {
        throw new Error(`Error while deleting article : ${err.message}`)
    }
}

export const deleteArticleByDealer = async (SQLClient, {personId}) =>{
    try {
        return await SQLClient.query("DELETE FROM article WHERE dealer_id = $1", [personId]);
    } catch (err) {
        throw new Error(`Error while deleting article by dealer : ${err.message}`);
    }
}