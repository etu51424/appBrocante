import * as dealerValidator from '../schemas/dealer.js'

export const dealerValidatorMiddlewares = {
    dealerId : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerId.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    dealerToAdd : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerToAdd.validate(req.body); 
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    dealerToUpdate : async (req, res, next) => {
        try {
            req.val = await dealerValidator.dealerToUpdate.validate(req.body); 
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    dealerToDelete : async (req, res, next) => {
        try { 
            // params car identique que dealerId middleware
            req.val = await dealerValidator.dealerToDelete.validate(req.params)
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};