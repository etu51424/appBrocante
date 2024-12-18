import * as slotModel from "../../model/CRUD/slot.js";
import {pool} from "../../database/dbAccess.js";

export const createSlot = async (req, res) => {
    try{
        const id = await slotModel.createSlot(pool, req.val);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating slot: ${err.message}`);
    }
}

export const getSlot = async (req, res) => {
    try{
        const slot = await slotModel.readSlot(pool, req.val);
        if (slot) {
            res.status(200).send(slot);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting slot: ${err.message}`);
    }
}

export const getAllSlots = async (req, res) => {
    try {
        const slots = await slotModel.readAllSlot(pool, req.val);
        if (slots.length > 0) {
            res.status(200).json(slots);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all slots : ${err.message}`);
    }
}

export const getAllSlotsByFleaMarketId = async (req, res) => {
    try {
        const slots = await slotModel.readAllSlotByFleaMarketId(pool, req.val);
        if (slots.length > 0) {
            res.status(200).json(slots);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all slots by fleaMarketId : ${err.message}`);
    }
}

export const updateSlot = async (req, res) => {
    try{
        await slotModel.updateSlot(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating slot: ${err.message}`);
    }
}

export const deleteSlot = async (req, res) => {
    try{
        await slotModel.deleteSlot(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while deleting slot: ${err.message}`);
    }
}