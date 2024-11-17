import * as fleaMarketModel from "../model/fleaMarket.js";
import {pool} from "../database/dbAccess.js";
import {deleteSlotByFleaMarket} from "../model/slot.js";
import {deleteInterestByFleaMarket} from "../model/interest.js";

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
    let SQLClient;
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteSlotByFleaMarket(SQLClient, req.params);
        await deleteInterestByFleaMarket(SQLClient, req.params);
        await fleaMarketModel.deleteFleaMarket(SQLClient, req.params);

        await SQLClient.query("COMMIT");
        res.sendStatus(204);
    } catch (err){
        console.error(err);
        try{
            if(SQLClient){
                SQLClient.query("ROLLBACK");
            }
        } catch (err){
            console.error(err);
        } finally {
            res.sendStatus(500);
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}