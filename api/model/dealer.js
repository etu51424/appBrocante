import {pool} from "../database/dbAccess.js";
import {deleteArticleByDealer} from "./article.js";

export const createDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    const {rows} = await SQLClient.query("INSERT INTO dealer (person_id, type, description, signup_date, average_rating, review_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [personId, type, description, signupDate, averageRating, reviewCount]);

    return rows[0]?.id;
}

export const readDealer = async (SQLClient, {personId}) => {
    const {rows} = await SQLClient.query("SELECT * FROM dealer WHERE id = $1", [personId]);
    return rows[0];
}

export const updateDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    let query = "UPDATE person SET ";
    const querySet = [];
    const queryValues = [];
    if (type){
        queryValues.push(type);
        querySet.push(`type=$${queryValues.length}`);
    }
    if (description){
        queryValues.push(description);
        querySet.push(`description=$${queryValues.length}`);
    }
    if (signupDate){
        queryValues.push(signupDate);
        querySet.push(`signup_date=$${queryValues.length}`);
    }
    if (averageRating){
        queryValues.push(averageRating);
        querySet.push(`average_rating=$${queryValues.length}`);
    }
    if (reviewCount){
        queryValues.push(reviewCount);
        querySet.push(`review_count=$${queryValues.length}`);
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
        queryValues.push(personId);
        query += `${querySet.join(", ")} WHERE person_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }
    else{
        throw new Error("No field given");
    }
}

export const deleteDealer = async ({personId}, SQLClient=null) => {
    let shouldManageTransaction = !SQLClient;
    if (!SQLClient) {
        SQLClient = pool.connect();
    }

    try{
        if(shouldManageTransaction) {
            SQLClient = await pool.connect();
            await SQLClient.query("BEGIN");
        }

        await deleteArticleByDealer(SQLClient, {personId});
        await SQLClient.query("DELETE FROM dealer WHERE person_id = $1", [personId]);

        if(shouldManageTransaction) {
            await SQLClient.query("COMMIT");
        }

    } catch (err){
        console.error(err);
        try{
            if(shouldManageTransaction){
                SQLClient.query("ROLLBACK");
            }
        } catch (err){
            console.error(err);
        } finally {
            throw new Error("Erreur dans le modelDealer");
        }
    } finally {
        if (shouldManageTransaction){
            SQLClient.release();
        }
    }
}