import * as slotModel from "../model/slot.js";
import {pool} from "../database/dbAccess.js";

export const getSlot = async (req, res) => {
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