import * as articleModel from "../model/article.js";
import {pool} from "../database/dbAccess.js";

export const createArticle = async (req, res) => {
    try{
        const id = await articleModel.createArticle(pool, req.val);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating article : ${err.message}`);
    }
}

export const getArticle = async (req, res) => {
    try{
        const article = await articleModel.readArticle(pool, req.val);
        if (article) {
            res.status(200).send(article);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting article : ${err.message}`);
    }
}

export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.readAllArticles(pool, req.val);
        if (articles.length > 0) {
            res.status(200).json(articles);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all articles : ${err.message}`);
    }
}

export const updateArticle = async (req, res) => {
    try{
        await articleModel.updateArticle(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating article : ${err.message}`);
    }
}

export const deleteArticle = async (req, res) => {
    try{
        await articleModel.deleteArticle(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while deleting article : ${err.message}`);
    }
}
