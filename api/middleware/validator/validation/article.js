import * as articleValidator from '../schemas/article.js';

export const articleValidatorMiddleware = {
    //ou appeler ça searchedArticle
    articleId: async (req, res, next) => {
        try {
            req.val = await articleValidator.articleId.validate(req.params);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
    articleToAdd : async (req, res, next) => {
        try {
            req.val = await articleValidator.articleToAdd.validate(req.body);
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
    articleToUpdate : async (req, res, next) => {
        try {
            req.val =await articleValidator.articleToUpdate.validate(req.body);
        } catch(e) {
            res.status(400).send(e.messages);
        }
    }
}