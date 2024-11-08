import * as articleModel from "../model/article.js";
import {pool} from "../database/dbAccess.js";

export const getArticle = async (req, res) => {
    try{
        const article = await articleModel.readArticle(pool, req.params);
        if (article) {
            res.send(article);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}