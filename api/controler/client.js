import * as clientModel from "../model/client.js";
import {pool} from "../database/dbAccess.js";
import {sign} from "../utils/jwt.js";

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
        res.sendStatus(500);
        console.error(`Error while trying to log : ${err.message}`);
    }
};