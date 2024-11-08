import * as interestModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";

export const getInterest = async (req, res) => {
    try{
        const interest = await interestModel.readArticle(pool, req.params);
        if (interest) {
            res.send(interest);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}