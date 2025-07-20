import * as slotValidator from '../schemas/slot.js';

const slotValidatorMiddleware =  {
    slotId : async (req, res, next) => {
        try{
            req.val = await slotValidator.slotId.validate(req.params);
            next();
        } catch(err){
            res.status(400).send(err.messages);
        }
    },
    slotToSearch: async (req, res, next) => {
      try{
          const args = await slotValidator.slotToSearch.validate(req.query);
          req.val.fleaMarketId = args.fleaMarketId;
          next();
      }  catch(err){
          res.status(400).send(err.messages);
      }
    },
    slotToAdd : async (req, res, next) => {
        try{
            req.val = await slotValidator.slotToAdd.validate(req.body);
            next();
        } catch(err){
            res.status(400).send(err.messages);
        }
    },
    slotToUpdate: async (req, res, next) => {
        try{
            req.val = await slotValidator.slotToUpdate.validate(req.body);
            next();
        } catch(err){
            res.status(400).send(err.messages);
        }
    },
}

export default slotValidatorMiddleware ;