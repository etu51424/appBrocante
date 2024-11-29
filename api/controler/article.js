import * as articleModel from "../model/article.js";
import {pool} from "../database/dbAccess.js";

export const createArticle = async (req, res) => {
    try{
        const id = await articleModel.createArticle(pool, req.body);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500).message(`Error while creating article : ${err.message}`);
    }
}

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

export const updateArticle = async (req, res) => {
    try{
        await articleModel.updateArticle(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const deleteArticle = async (req, res) => {
    try{
        await articleModel.deleteArticle(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}