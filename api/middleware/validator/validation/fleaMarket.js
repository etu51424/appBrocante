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

    fleaMarketToSearch: async (req, res, next) => {
      try{
          const args = await fleaMarketValidator.fleaMarketToSearch.validate(req.query);
          req.val.title = args.title;
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
            console.error(e)
            res.status(400).send(e.messages);
        }
    },
};

export default fleaMarketMiddlewares;