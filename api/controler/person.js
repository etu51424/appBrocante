import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";

export const createPerson = async (req, res) => {
    try{
        const id = await personModel.createPerson(pool, req.body);
        res.status(201).json({id});
    } catch (err){
        res.sendStatus(500);
    }
}

export const getPerson = async (req, res) => {
    try{
        const person = await personModel.readPerson(pool, req.params);
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
    try{
        await personModel.deletePerson(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}