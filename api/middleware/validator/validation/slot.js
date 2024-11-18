import * as slotValidator from '../schemas/slot.js';

const slotValidatorMiddleware =  {
    slotId : async (req, res, next) => {
        try{
            req.val = await slotValidator.slotId.validate(req.params);
            next();
        } catch(err){
            res.status(400).send(err.message);
        }
    },
    slotToAdd : async (req, res, next) => {
        try{
            req.val = await slotValidator.slotToAdd.validate(req.body);
            next();
        } catch(err){
            res.status(400).send(err.message);
        }
    },
    slotToUpdate: async (req, res, next) => {
        try{
            req.val = await slotValidator.slotToUpdate.validate(req.body);
            next();
        } catch(err){
            res.status(400).send(err.message);
        }
    },
    slotToDelete: async (req, res, next) => {
        try{
            req.val = await slotValidator.slotToDelete.validate(req.params);
            next();
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

export default slotValidatorMiddleware ;