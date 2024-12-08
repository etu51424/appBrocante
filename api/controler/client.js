import * as clientModel from "../model/client.js";
import {pool} from "../database/dbAccess.js";
import {sign} from "../utils/utils.js";

export const login = async (req, res) => {
    try {
        const rep = await clientModel.readPersonWithPassword(pool, req.val);
        console.log(rep);
        if(rep.personId) {
            if(!rep.isBanned) {
                const jwt = sign(rep, {
                    expiresIn: '8h'
                });
                res.status(201).send(jwt);
            } else{
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};