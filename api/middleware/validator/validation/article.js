import * as articleValidator from '../schemas/article.js';

const articleValidatorMiddleware = {
    articleId: async (req, res, next) => {
        try {
            req.val = await articleValidator.articleId.validate(req.body);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
    articleToAdd : async (req, res, next) => {
        try {
            req.val = await articleValidator.articleToAdd.validate(req.body);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
    articleToUpdate : async (req, res, next) => {
        try {
            req.val =await articleValidator.articleToUpdate.validate(req.body);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
};

export default articleValidatorMiddleware;