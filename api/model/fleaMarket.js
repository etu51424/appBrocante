export const createFleaMarket = async (SQLClient, {address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount}) => {
    let query = "INSERT INTO flea_market ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (address !== undefined){
        dbColumns.push("address");
        queryValues.push(address);
        querySet.push(`$${queryValues.length}`);
    }
    if (dateStart !== undefined){
        dbColumns.push("date_start");
        queryValues.push(dateStart);
        querySet.push(`$${queryValues.length}`);
    }
    if (dateEnd !== undefined){
        dbColumns.push("date_end");
        queryValues.push(dateEnd);
        querySet.push(`$${queryValues.length}`);
    }
    if (title !== undefined){
        dbColumns.push("title");
        queryValues.push(title);
        querySet.push(`$${queryValues.length}`);
    }
    if (theme !== undefined){
        dbColumns.push("theme");
        queryValues.push(theme);
        querySet.push(`$${queryValues.length}`);
    }
    if (isCharity !== undefined){
        dbColumns.push("is_charity");
        queryValues.push(isCharity);
        querySet.push(`$${queryValues.length}`);
    }
    if (averageRating !== undefined) {
        dbColumns.push("average_rating");
        queryValues.push(averageRating);
        querySet.push(`$${queryValues.length}`);
    }
    if (reviewCount !== undefined) {
        dbColumns.push("review_count");
        queryValues.push(reviewCount);
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

export const readFleaMarket = async (SQLClient, {fleaMarketId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM flea_market WHERE id = $1", [fleaMarketId]);
    return rows[0];
}

export const updateFleaMarket = async (SQLClient, {id ,address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (address !== undefined){
        queryValues.push(address);
        querySet.push(`address=$${queryValues.length}`);
    }
    if (dateStart !== undefined){
        queryValues.push(dateStart);
        querySet.push(`date_start=$${queryValues.length}`);
    }
    if (dateEnd !== undefined){
        queryValues.push(dateEnd);
        querySet.push(`date_end=$${queryValues.length}`);
    }
    if (title !== undefined){
        queryValues.push(title);
        querySet.push(`title=$${queryValues.length}`);
    }
    if (theme !== undefined){
        queryValues.push(theme);
        querySet.push(`theme=$${queryValues.length}`);
    }
    if (isCharity !== undefined){
        queryValues.push(isCharity);
        querySet.push(`is_charity=$${queryValues.length}`);
    }
    if (averageRating !== undefined){
        queryValues.push(averageRating);
        querySet.push(`average_rating=$${queryValues.length}`);
    }
    if (reviewCount !== undefined){
        queryValues.push(reviewCount);
        querySet.push(`review_count=$${queryValues.length}`);
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

export const deleteFleaMarket = async (SQLClient, {fleaMarketId}) => {
    return await SQLClient.query("DELETE FROM flea_market WHERE id = $1", [fleaMarketId]);
}