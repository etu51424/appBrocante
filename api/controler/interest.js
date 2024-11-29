import * as interestModel from "../model/interest.js";
import {pool} from "../database/dbAccess.js";

export const createInterest = async (req, res) => {
    try{
        const id = await interestModel.createInterest(pool, req.body);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
    }
}

export const getInterest = async (req, res) => {
    try{
        const interest = await interestModel.readInterest(pool, req.params);
        if (interest) {
            res.send(interest);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
    }
}

export const updateInterest = async (req, res) => {
    try{
        await interestModel.updateInterest(pool, req.body);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}

export const deleteInterest = async (req, res) => {
    try{
        await interestModel.deleteInterest(pool, req.params);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
    }
}