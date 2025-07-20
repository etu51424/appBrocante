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
    interestToSearch: async (req, res, next) => {
        try{
            const args = await interestValidator.interestToSearch.validate(req.query);

            if (args.fleaMarketId === undefined && args.personId === undefined) {
                return res.status(400).json({
                    errors: [
                        {
                            field: 'query',
                            message: 'Au moins un des champs "fleaMarketId" ou "personId" est requis',
                        },
                    ],
                });
            } else {
                req.val.personId = args.personId;
                req.val.fleaMarketId = args.fleaMarketId;
                next();
            }
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
};

export default interestMiddlewares;