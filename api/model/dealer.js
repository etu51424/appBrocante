import {pool} from "../database/dbAccess.js";
import {deleteArticleByDealer} from "./article.js";

export const createDealer = async (SQLClient, {personId, type, description, signupDate, averageRating, reviewCount}) => {
    let query = "INSERT INTO dealer ";

    const querySet = [];
    const queryValues = [];
    const dbColumns = [];
    if (personId){
        dbColumns.push("person_id");
        queryValues.push(personId);
        querySet.push(`$${queryValues.length}`);
    }
    if (type){
        dbColumns.push("type");
        queryValues.push(type);
        querySet.push(`$${queryValues.length}`);
    }
    if (description){
        dbColumns.push("description");
        queryValues.push(description);
        querySet.push(`$${queryValues.length}`);
    }
    if (signupDate){
        dbColumns.push("signup_date");
        queryValues.push(signupDate);
        querySet.push(`$${queryValues.length}`);
    }
    if (averageRating){
        dbColumns.push("average_rating");
        queryValues.push(averageRating);
        querySet.push(`$${queryValues.length}`);
    }
    if (reviewCount){
        dbColumns.push("review_count");
        queryValues.push(reviewCount);
        querySet.push(`$${queryValues.length}`);
    }
    if (queryValues.length > 0){
        query += `(${dbColumns.join(",")}) VALUES (${querySet.join(",")}) RETURNING person_id`;
        const {rows} = await SQLClient.query(query, queryValues);
        return rows[0]?.person_id;
    }
    else{
        throw new Error("No field given");
    }
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

export const deleteDealer = async (SQLClient, {personId}) => {
    return await SQLClient.query("DELETE FROM dealer WHERE person_id = $1", [personId]);
}