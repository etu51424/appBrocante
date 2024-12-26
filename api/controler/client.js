import * as clientModel from "../model/client.js";
import * as personModel from "../model/CRUD/person.js";
import {pool} from "../database/dbAccess.js";
import {sign} from "../utils/jwt.js";
import {sendMail} from "../utils/mail.js";

export const login = async (req, res) => {
    try {
        console.log(req.val)
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

// concernant la gestion des codes de récupération

export const getRecoveryCode = async (req, res) => {
    try{
        let code = await clientModel.createRecoveryCode(pool, req.val);
        let person = await personModel.readPerson(pool, req.val);
        console.log(person)
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
    console.log(req.val)
    try {

        let codeInDB = await clientModel.readRecoveryCode(pool, req.val);
        if (codeInDB?.recovery_code) {
            if (codeInDB.recovery_code === req.val.recoveryCode){
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

// concernant la gestion des administrateurs

export const promotePersonAdmin = async (req, res) => {
    try{
        await personModel.promotePersonAdmin(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while promoting person : ${err.message} `);
    }
}

export const demotePersonAdmin = async (req, res) => {
    try{
        await personModel.demotePersonAdmin(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while demoting person : ${err.message} `);
    }
}

// concerne les expulsions du système

export const banPerson = async (req, res) => {
    try{
        await personModel.banPerson(pool, req.val);
        res.sendStatus(204);
        let person = await personModel.readPerson(pool, req.val);
        if (person) {
            await sendMail(person.email,
                "Expulsion temporaire",
                `Nous sommes dans le regret de devoir vous annoncer que votre compte AppBrocante est désormais suspendu, ${person.username} !\nSi vous pensez qu'il s'agit d'une erreur, contactez nous.`
            );
        }

    } catch (err){
        res.sendStatus(500);
        console.error(`Error while banning person : ${err.message} `);
    }
}
export const unbanPerson = async (req, res) => {
    try{
        await personModel.unbanPerson(pool, req.val);
        res.sendStatus(204);
        const person = await personModel.readPerson(pool, req.val);
        if (person) {
            await sendMail(person.email,
                "Rétablissement du compte",
                `La suspension de votre compte est désormais levée, ${person.username} !`
            );
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while unbanning person : ${err.message} `);
    }
}