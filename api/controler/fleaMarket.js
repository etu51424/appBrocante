import * as fleaMarketModel from "../model/fleaMarket.js";
import {pool} from "../database/dbAccess.js";

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