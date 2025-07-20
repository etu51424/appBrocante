import * as dealerModel from "../../model/CRUD/dealer.js";
import {pool} from "../../database/dbAccess.js";
import {deleteArticleByDealer} from "../../model/CRUD/article.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      Dealer:
 *          type: object
 *          properties:
 *              person_id:
 *                  type: number
 *              type:
 *                  type: string
 *              description:
 *                  type: string
 *              signup_date:
 *                  type: string
 *                  format: date
 *              average_rating:
 *                  type: number
 *              review_count:
 *                  type: string
 */

/**
 * @swagger
 * components:
 *  responses:
 *      getDealer:
 *          description: the Dealer
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Dealer'
 */

/**
 * @swagger
 * components:
 *  responses:
 *      getAllDealers:
 *          description: all the Dealers
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Dealer'
 */

/**
 * @swagger
 * components:
 *  responses:
 *      DealerAdded:
 *          description: the Dealer
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 */

export const createDealer = async (req, res) => {
    try{
        const id = await dealerModel.createDealer(pool, req.val);
        if (id) {
            res.status(201).json({id});
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while creating dealer : ${err.message}`);
    }
}

export const getDealer = async (req, res) => {
    try{
        const dealer = await dealerModel.readDealer(pool, req.val);
        if (dealer) {
            res.status(200).send(dealer);
        }
        else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting dealer : ${err.message}`);
    }
}

export const getAllDealers = async (req, res) => {
    try {
        const dealers = await dealerModel.readAllDealers(pool, req.val);
        if (dealers.length > 0) {
            res.status(200).json(dealers);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all dealers : ${err.message}`);
    }
}

export const getAllDealersByType = async (req, res) => {
    try {
        const dealers = await dealerModel.readAllDealersByType(pool, req.val);
        if (dealers.length > 0) {
            res.status(200).json(dealers);
        } else {
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while getting all dealers by type : ${err.message}`);
    }
}

export const updateDealer = async (req, res) => {
    try{
        await dealerModel.updateDealer(pool, req.val);
        res.sendStatus(204);
    } catch (err){
        res.sendStatus(500);
        console.error(`Error while updating dealer : ${err.message}`);
    }
}

export const deleteDealer = async (req, res) => {
    let SQLClient;
    try{
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");

        await deleteArticleByDealer(SQLClient, req.val);
        await dealerModel.deleteDealer(SQLClient, req.val);

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
            console.error(`Error while deleting dealer : ${err.message}`);
        }
    } finally {
        if (SQLClient){
            SQLClient.release();
        }
    }
}