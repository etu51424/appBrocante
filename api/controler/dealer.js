import * as dealerModel from "../model/dealer.js";
import {pool} from "../database/dbAccess.js";

export const getDealer = async (req, res) => {
    try{
        const dealer = await dealerModel.readDealer(pool, req.params);
        if (dealer) {
            res.send(dealer);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}