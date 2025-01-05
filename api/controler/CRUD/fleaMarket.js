import * as fleaMarketModel from "../../model/CRUD/fleaMarket.js";
import {pool} from "../../database/dbAccess.js";
import {deleteSlotByFleaMarket} from "../../model/CRUD/slot.js";
import {deleteInterestByFleaMarket} from "../../model/CRUD/interest.js";
import {readPerson} from "../../model/CRUD/person.js";
import {getDistance} from "../../utils/map.js"

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
        const fleaMarkets = await fleaMarketModel.readAllFleaMarket(pool, req.val);
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

export const getAllFleaMarketsWithinRange = async (req, res) =>{
    console.log("AAAAAA");
    try {
        const fleaMarkets = await fleaMarketModel.readAllFleaMarketWithoutLimit(pool);
        const person = await readPerson(pool, req.val);
        if (fleaMarkets.length > 0 && person) {
            if (person.address){
                const distances = await Promise.all(
                    fleaMarkets.map(fleaMarket =>
                        getDistance(person.address, fleaMarket.address, process.env.MAP_API_KEY)
                    )
                );
                // cette ligne va filtrer les fleaMarkets en fonction de la distance en parametre
                const fleaMarketsInRange = fleaMarkets.filter((_, index) => distances[index] <= req.val.range);
                console.log(fleaMarketsInRange);
                res.status(200).json(fleaMarketsInRange);
            } else {
                res.status(404).send("The user does not have a referenced address");
            }
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all flea markets withing range : ${err.message}`);
    }
}

export const getAllFleaMarketsBetweenDates = async (req, res) => {
    try {
        const fleaMarkets = await fleaMarketModel.readAllFleaMarketBetweenDates(pool, req.val);
        if (fleaMarkets.length > 0) {
            res.status(200).json(fleaMarkets);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all flea markets between two dates : ${err.message}`);
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