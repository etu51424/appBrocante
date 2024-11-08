import * as personModel from "../model/person.js";
import {pool} from "../database/dbAccess.js";

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