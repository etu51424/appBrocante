import * as slotModel from "../model/slot.js";
import {pool} from "../database/dbAccess.js";


export const createSlot = async (req, res) => {
    try{
        const id = await slotModel.createSlot(pool, req.body);
        res.status(201).json({id});
    } catch (err){
        res.sendStatus(500);
    }
}

export const getSlot = async (req, res) => {
    console.log(req.params);
    try{
        const slot = await slotModel.readSlot(pool, req.params);
        if (slot) {
            res.send(slot);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}

export const updateSlot = async (req, res) => {
    try{
        await slotModel.updateSlot(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const deleteSlot = async (req, res) => {
    try{
        await slotModel.deleteSlot(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}