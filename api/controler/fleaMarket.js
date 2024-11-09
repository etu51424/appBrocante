import * as fleaMarketModel from "../model/fleaMarket.js";
import {pool} from "../database/dbAccess.js";
import * as personModel from "../model/person.js";

export const createFleaMarket = async (req, res) => {
    try{
        const id = await fleaMarketModel.createFleaMarket(pool, req.body);
        res.status(201).json({id});
    } catch (err){
        res.sendStatus(500);
    }
}

export const getFleaMarket = async (req, res) => {
    try{
        const fleaMarket = await fleaMarketModel.readFleaMarket(pool, req.params);
        if (fleaMarket) {
            res.send(fleaMarket);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}

export const updateFleaMarket = async (req, res) => {
    try{
        await fleaMarketModel.updateFleaMarket(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const deleteFleaMarket = async (req, res) => {
    try{
        await fleaMarket.FleaMarket(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}