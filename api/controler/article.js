import * as articleModel from "../model/article.js";
import {pool} from "../database/dbAccess.js";

export const createArticle = async (req, res) => {
    try{
        const id = await articleModel.createArticle(pool, req.body);
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
        const article = await articleModel.readArticle(pool, req.params);
        if (article) {
            res.send(article);
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
        console.log("controler/getAllArticles");
        const articles = await articleModel.readAllArticles(pool, req.params);
        //.length verifie que c'est bien un array
        console.log("In Controller " + articles[2].title + " In Controller ");
        if (articles && articles.length > 0) {
            console.log("In Controller 200 " + articles[2].title + " In Controller ");
            // envoit les articles en json sinon pas interpretables par postman
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
        await articleModel.updateArticle(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating article : ${err.message}`);
    }
}

export const deleteArticle = async (req, res) => {
    try{
        await articleModel.deleteArticle(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while deleting article : ${err.message}`);
    }
}
