import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";
import {deleteArticleByDealer} from "../model/article.js";
import {deleteDealer} from "../model/dealer.js";
import {deleteInterestByPerson} from "../model/interest.js";
import {hash, sendMail} from "../utils/utils.js";


export const createPerson = async (req, res) => {

    try{
        req.body.password = await hash(req.body.password);
        const id = await personModel.createPerson(pool, req.body);
        res.status(201).json({id});
        await sendMail(req.val.email,
            "Bienvenue sur l'AppBrocante !",
            `Nous vous remercions pour votre inscription sur l'AppBrocante, ${req.val.name} !`,);
    } catch (err){
        res.sendStatus(500);
    }
}

export const getPerson = async (req, res) => {
    try{
        const person = await personModel.readPerson(pool, req.val);
        if (person) {
            res.send(person);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}

export const updatePerson = async (req, res) => {
    try{
        await personModel.updatePerson(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const deletePerson = async (req, res) => {
    let SQLClient;
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteArticleByDealer(SQLClient, req.params);
        await deleteDealer(SQLClient, req.params);
        await deleteInterestByPerson(SQLClient, req.params);
        await personModel.deletePerson(SQLClient, req.params);

        await SQLClient.query("COMMIT");
        res.sendStatus(204);
    } catch (err){
        console.error(err);
        try{
            if(SQLClient){
                SQLClient.query("ROLLBACK");
            }
        } catch (err){
            console.error(err);
        } finally {
            res.sendStatus(500);
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}

export const promotePersonAdmin = async (req, res) => {
    try{
        await personModel.promotePersonAdmin(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const demotePersonAdmin = async (req, res) => {
    try{
        await personModel.demotePersonAdmin(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}