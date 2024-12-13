import * as dealerValidator from '../schemas/dealer.js'

export const dealerValidatorMiddlewares = {
    dealerId : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerId.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    dealerToAdd : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
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