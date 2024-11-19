import * as interestValidator from '../schemas/interest.js'

export const interestMiddlewares = {
    interestId : async (req, res, next) => {
        try {
            req.val = await interestValidator.interestId.validate(req.params)
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    interestToAdd : async (req, res, next) => {
        try{
            req.val = await interestValidator.interestToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    interestToUpdate: async (req, res, next) => {
        try{
            req.val = await interestValidator.interestToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    interestToDelete: async (req, res, next) => {
        try{
            req.val = await interestValidator.interestToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export default interestMiddlewares;