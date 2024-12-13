import * as clientModel from "../model/client.js";
import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";
import {sign} from "../utils/jwt.js";
import {sendMail} from "../utils/mail.js";

export const login = async (req, res) => {
    try {
        const rep = await clientModel.readPersonWithPassword(pool, req.val);
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

export const getRecoveryCode = async (req, res) => {
    try{
        let code = await clientModel.createRecoveryCode(pool, req.val);
        let person = await personModel.readPerson(pool, req.val);
        if (code && person) {
           await sendMail(person?.email,
               "Code de récupération",
               `Votre code de récupération est : ${code}.\nNe le divulgez à personne.`);
           res.sendStatus(201)
        }
        else{
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting a recovery code : ${err.message}`);
    }
}

export const verifyRecoveryCode = async (req, res) => {
    try {
        let codeInDB = await clientModel.readRecoveryCode(pool, req.val);
        if (codeInDB?.recovery_code) {
            if (codeInDB.recovery_code === req.val.code){
                await clientModel.deleteRecoveryCode(pool, req.val);
                res.sendStatus(200);
            }
        }
        else{
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error(`Error while verifying recovery code : ${err.message}`);
    }
}