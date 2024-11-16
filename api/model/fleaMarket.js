import {pool} from "../database/dbAccess.js";
import {deleteInterestByFleaMarket} from "./interest.js";
import {deleteSlotByFleaMarket} from "./slot.js";

export const createFleaMarket = async (SQLClient, {address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount}) => {
    const {rows} = await SQLClient.query("INSERT INTO flea_market (address, date_start, date_end, title, theme, is_charity, average_rating, review_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount]);

    return rows[0]?.id;
}

export const readFleaMarket = async (SQLClient, {fleaMarketId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM flea_market WHERE id = $1", [fleaMarketId]);
    return rows[0];
}

export const updateFleaMarket = async (SQLClient, {id ,address, dateStart, dateEnd, title, theme, isCharity, averageRating, reviewCount}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (address){
        queryValues.push(address);
        querySet.push(`address=$${queryValues.length}`);
    }
    if (dateStart){
        queryValues.push(dateStart);
        querySet.push(`date_start=$${queryValues.length}`);
    }
    if (dateEnd){
        queryValues.push(dateEnd);
        querySet.push(`date_end=$${queryValues.length}`);
    }
    if (title){
        queryValues.push(title);
        querySet.push(`title=$${queryValues.length}`);
    }
    if (theme){
        queryValues.push(theme);
        querySet.push(`theme=$${queryValues.length}`);
    }
    if (isCharity){
        queryValues.push(isCharity);
        querySet.push(`is_charity=$${queryValues.length}`);
    }
    if (averageRating){
        queryValues.push(averageRating);
        querySet.push(`average_rating=$${queryValues.length}`);
    }
    if (reviewCount){
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
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteInterestByFleaMarket(SQLClient, {fleaMarketId});
        await deleteSlotByFleaMarket(SQLClient, {fleaMarketId});
        await SQLClient.query("DELETE FROM flea_market WHERE id = $1", [fleaMarketId]);
        
        await SQLClient.query("COMMIT");

    } catch (err){
        console.error(err);
        try{
            if(SQLClient){
                SQLClient.query("ROLLBACK");
            }
        } catch (err){
            console.error(err);
        } finally {
            throw new Error("Erreur dans le modelFleaMarket");
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}