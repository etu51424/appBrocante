import * as fleaMarketModel from "../model/fleaMarket.js";
import {pool} from "../database/dbAccess.js";
import {deleteSlotByFleaMarket} from "../model/slot.js";
import {deleteInterestByFleaMarket} from "../model/interest.js";

export const createFleaMarket = async (req, res) => {
    try{
        const id = await fleaMarketModel.createFleaMarket(pool, req.val);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating fleaMarket: ${err.message}`);
    }
}

export const getFleaMarket = async (req, res) => {
    try{
        const fleaMarket = await fleaMarketModel.readFleaMarket(pool, req.val);
        if (fleaMarket) {
            res.status(200).send(fleaMarket);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting fleaMarket: ${err.message}`);
    }
}

export const getAllFleaMarkets = async (req, res) => {
    try {
        const fleaMarkets = await fleaMarketModel.readAllFleaMarket(pool);
        if (fleaMarkets.length > 0) {
            res.status(200).json(fleaMarkets);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all flea markets : ${err.message}`);
    }
}

export const updateFleaMarket = async (req, res) => {
    try{
        await fleaMarketModel.updateFleaMarket(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating fleaMarket: ${err.message}`);
    }
}

export const deleteFleaMarket = async (req, res) => {
    let SQLClient;
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteSlotByFleaMarket(SQLClient, req.val);
        await deleteInterestByFleaMarket(SQLClient, req.val);
        await fleaMarketModel.deleteFleaMarket(SQLClient, req.val);

        await SQLClient.query("COMMIT");
        res.sendStatus(204);
    } catch (err){
        try{
            if(SQLClient){
                SQLClient.query("ROLLBACK");
            }
        } catch (e){
            console.error(`Error while rollbacking : ${e.message}`);
        } finally {
            res.sendStatus(500);
            console.error(`Error while deleting fleaMarket: ${err.message}`);
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}