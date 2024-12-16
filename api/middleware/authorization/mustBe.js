import {readArticle} from "../../model/article.js";
import {pool} from "../../database/dbAccess.js";

// middleware d'authorization

export const dealer = (req, res, next) => {
    if(req.session.status === 'dealer'){
        next();
    } else {
        res.status(403).send("User is not a dealer");
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: the action must be realized by an administrator
 */

export const admin = (req, res, next) => {
    if(req.session.isAdmin){
        next();
    } else{
        res.status(403).send("User is not an admin");
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      mustBeNotBanned:
 *          description: the action must be realized by a person whose is not banned from the system
 */

export const notBanned = (req, res, next) => {
    if (!req.session.isBanned){
        next();
    } else {
        res.status(403).send("User is banned");
    }
}

export const himself = (req, res, next) => {
    if (!req.val){
        req.val = {};
    }
    req.val.personId = req.session.personId;
    next();
}

export const owner = async (req, res, next) => {
    const article = await readArticle(pool, req.val);
    if (!article) {
        return res.status(404)
    }
    else{
        if (article?.dealer_id === req.val.personId){
            next();
        } else {
            res.status(403).send("User is not the owner of this object");
        }
    }
}