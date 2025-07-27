export const createSlot = async (SQLClient, {fleaMarketId, isAvailable, area}) => {
    let query = "INSERT INTO slot ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (area !== undefined){
        dbColumns.push("area");
        queryValues.push(area);
        querySet.push(`$${queryValues.length}`);
    }
    if (fleaMarketId !== undefined) {
        dbColumns.push("flea_market_id");
        queryValues.push(fleaMarketId);
        querySet.push(`$${queryValues.length}`);
    }
    if (isAvailable !== undefined) {
        dbColumns.push("is_available");
        queryValues.push(isAvailable);
        querySet.push(`$${queryValues.length}`);
    }

    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING id`;
        try {
            const {rows} = await SQLClient.query(query, queryValues);
            return rows[0]?.id;
        } catch (err) {
            throw new Error(`Error while creating slot : ${err.message}`);
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const readSlot = async (SQLClient, {id}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM slot WHERE id = $1", [id]);
        return rows[0];
    } catch (err) {
        throw new Error(`Error while reading slot : ${err.message}`);
    }
}

export const readAllSlot = async (SQLClient, {limit, offset}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM slot LIMIT $1 OFFSET $2", [limit, offset]);

        rows.map( (row) =>{
            row.fleaMarketId = row.flea_market_id;
            row.isAvailable = row.is_available;
        } )

        return rows;
    } catch (err) {
        throw new Error(`Error while reading all slot : ${err.message}`);
    }
}

// méthode pourrie mais est utilisée par le projet d'appli mobile ==> Pas très grave comme l'API est déjà réussi #chillguy
export const readAllSlotByFleaMarketId = async (SQLClient, {fleaMarketId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM slot WHERE flea_market_id = $1", [fleaMarketId]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all slots by fleaMarketId : ${err.message}`);
    }
}

export const readAllSlotByFleaMarketIdWithLimits = async (SQLClient, {limit, offset, fleaMarketId}) => {
    try {
        const {rows} = await SQLClient.query("SELECT * FROM slot WHERE flea_market_id = $1 LIMIT $2 OFFSET $3", [fleaMarketId, limit, offset]);
        return rows;
    } catch (err) {
        throw new Error(`Error while reading all slot by fleaMarketId with limits : ${err.message}`);
    }
}

export const updateSlot = async (SQLClient, {id, fleaMarketId, isAvailable, area}) => {
    let query = "UPDATE slot SET ";
    const querySet = [];
    const queryValues = [];
    if (isAvailable !== undefined){
        queryValues.push(isAvailable);
        querySet.push(`is_available=$${queryValues.length}`);
    }
    if (area !== undefined){
        queryValues.push(area);
        querySet.push(`area=$${queryValues.length}`);
    }
    if (fleaMarketId !== undefined){
        queryValues.push(fleaMarketId);
        querySet.push(`flea_market_id=$${queryValues.length}`);
    }
    if (queryValues.length > 0) {
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        try {
            return await SQLClient.query(query, queryValues);
        } catch (err) {
            throw new Error(`Error while updating slot : ${err.message}`)
        }
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteSlot = async (SQLClient, {id}) => {
    try {
        return await SQLClient.query("DELETE FROM slot WHERE id = $1", [id]);
    } catch (err) {
        throw new Error(`Error while deleting slot : ${err.message}`)
    }
}

export const deleteSlotByFleaMarket = async (SQLClient, {fleaMarketId}) => {
    try {
        return await SQLClient.query("DELETE FROM slot WHERE flea_market_id = $1", [fleaMarketId]);
    } catch (err) {
        throw new Error(`Error while deleting slot by flea market : ${err.message}`)
    }
}