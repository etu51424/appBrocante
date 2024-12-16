import * as dealerValidator from '../schemas/dealer.js'
import vine from "@vinejs/vine";

export const dealerValidatorMiddlewares = {
    dealerId : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerId.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    /**
     * @swagger
     * components:
     *  schemas:
     *      DealerToAdd:
     *          type: object
     *          properties:
     *              personId:
     *                  type: number
     *              type:
     *                  type: string
     *              description:
     *                  type: string
     *              signupDate:
     *                  type: string
     *                  format: date
     *              averageRating:
     *                  type: number
     *              reviewCount:
     *                  type: number
     *          required:
     *              - personId
     *              - averageRating
     *              - reviewCount
     */

    dealerToAdd : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },

    /**
     * @swagger
     * components:
     *  schemas:
     *      DealerToUpdate:
     *          type: object
     *          properties:
     *              personId:
     *                  type: number
     *              type:
     *                  type: string
     *              description:
     *                  type: string
     *              signupDate:
     *                  type: string
     *                  format: date
     *              averageRating:
     *                  type: number
     *              reviewCount:
     *                  type: number
     *          required:
     *              - personId
     */
    dealerToUpdate : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
};

export default dealerValidatorMiddlewares;