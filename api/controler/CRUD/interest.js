import * as interestModel from "../../model/CRUD/interest.js";
import * as personModel from "../../model/CRUD/person.js";
import {pool} from "../../database/dbAccess.js";

export const createInterest = async (req, res) => {
    try{
        const id = await interestModel.createInterest(pool, req.val);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating interest : ${err.message}`);
    }
}

export const getInterest = async (req, res) => {
    try{
        const interest = await interestModel.readInterest(pool, req.val);
        if (interest) {
            res.status(200).send(interest);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting interest : ${err.message}`);
    }
}

export const getAllInterests = async (req, res) => {
    try {
        const interests = await interestModel.readAllInterest(pool, req.val);
        if (interests.length > 0) {
            res.status(200).json(interests);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all interests : ${err.message}`);
    }
}

export const getAllInterestsByFleaMarketIdWithLimits = async (req, res) => {
    try {
        const interests = await interestModel.readAllInterestByFleaMarketIdWithLimits(pool, req.val);
        if (interests.length > 0) {
            res.status(200).json(interests);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all interests by fleaMarketId with limits : ${err.message}`);
    }
}

export const interestDispatchSearch = async (req, res) => {
    if (req.val.fleaMarketId){
        await getAllInterestsByFleaMarketIdWithLimits(req, res);
    } else if (req.val.personId){
        await getAllInterestsByPersonIdWithLimits(req, res);
    } else{
        res.status(500).send(`Dispatch method for interest could not found any way : fleaMarketId = ${req.val.fleaMarketId}, personId = ${req.val.personId}`);
    }
}

export const getAllInterestsByPersonIdWithLimits = async (req, res) => {
    try {
        const interests = await interestModel.readAllInterestByPersonIdWithLimits(pool, req.val);
        if (interests.length > 0) {
            res.status(200).json(interests);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all interests by personId with limits : ${err.message}`);
    }
}

export const getAllInterestsByFleaMarketId = async (req, res) => {
    try {
        const interests = await interestModel.readAllInterestByFleaMarketId(pool, req.val);
        if (interests.length > 0) {
            for (let i = 0; i < interests.length; i++) {

                interests[i]['person'] = await personModel.readPerson(pool,{personId : interests[i].person_id});
            }
            res.status(200).json(interests);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all interests : ${err.message}`);
    }
}

export const updateInterest = async (req, res) => {
    try{
        await interestModel.updateInterest(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating interest : ${err.message}`);
    }
}

export const deleteInterest = async (req, res) => {
    try{
        await interestModel.deleteInterest(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while deleting interest : ${err.message}`);
    }
}