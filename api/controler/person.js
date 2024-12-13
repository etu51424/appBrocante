import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";
import {deleteArticleByDealer} from "../model/article.js";
import {deleteDealer} from "../model/dealer.js";
import {deleteInterestByPerson} from "../model/interest.js";
import {hash} from "../utils/hash.js";
import {sendMail} from "../utils/mail.js";

export const createPerson = async (req, res) => {
    try{
        req.val.password = await hash(req.val.password);
        const id = await personModel.createPerson(pool, req.val);
        if (id) {
            res.status(201).json({id});
            await sendMail(req.val.email,
                "Bienvenue sur l'AppBrocante !",
                `Nous vous remercions pour votre inscription sur l'AppBrocante, ${req.val.name} !`,);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating person : ${err.message} `);
    }
}

export const getPerson = async (req, res) => {
    try{
        const person = await personModel.readPerson(pool, req.val);
        if (person) {
            res.status(200).send(person);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while reading person : ${err.message} `);
    }
}

export const getAllPersons = async (req, res) => {
    try {
        const persons = await personModel.readAllPerson(pool, req.val);
        if (persons.length > 0) {
            res.status(200).json(persons);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all persons : ${err.message}`);
    }
}

export const updatePerson = async (req, res) => {
    try{
        await personModel.updatePerson(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating person : ${err.message} `);
    }
}

export const deletePerson = async (req, res) => {
    let SQLClient;
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteArticleByDealer(SQLClient, req.val);
        await deleteDealer(SQLClient, req.val);
        await deleteInterestByPerson(SQLClient, req.val);
        await personModel.deletePerson(SQLClient, req.val);

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
            console.error(`Error while deleting person : ${err.message} `);
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
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
                `Nous sommes dans le regret de devoir vous annoncer que votre compte AppBrocante est désormais suspendu, ${person.name} !\nSi vous pensez qu'il s'agit d'une erreur, contactez nous.`
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
                `La suspension de votre compte est désormais levée, ${person.name} !`
            );
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while unbanning person : ${err.message} `);
    }
}