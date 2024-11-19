import * as fleaMarketValidator from '../schemas/fleaMarket.js'

export const fleaMarketMiddlewares = {
    fleaMarketId : async (req, res, next) => {
        try {
            req.val = await fleaMarketValidator.fleaMarketId.validate(req.params)
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    fleaMarketToAdd : async (req, res, next) => {
        try{
            req.val = await fleaMarketValidator.fleaMarketToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    fleaMarketToUpdate: async (req, res, next) => {
        try{
            req.val = await fleaMarketValidator.fleaMarketToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    fleaMarketToDelete: async (req, res, next) => {
        try{
            req.val = await fleaMarketValidator.fleaMarketToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export default fleaMarketMiddlewares;