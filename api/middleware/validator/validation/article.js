import * as articleValidator from '../schemas/article.js';

const articleValidatorMiddleware = {
    articleId: async (req, res, next) => {
        try {
            req.val = await articleValidator.articleId.validate(req.params);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },

    articleToSearch : async (req, res, next) => {
        try{
            const args = await articleValidator.articleToSearch.validate(req.query);
            req.val.title = args.title;
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },

    /**
     * @swagger
     * components:
     *  schemas:
     *      ArticleToAdd:
     *          type: object
     *          properties:
     *              personId:
     *                  type: number
     *              title:
     *                  type: string
     *              description:
     *                  type: string
     *              entryDate:
     *                  type: string
     *                  format: date
     *              cost:
     *                  type: number
     *              condition:
     *                  type: string
     */

    articleToAdd : async (req, res, next) => {
        try {
            req.val = await articleValidator.articleToAdd.validate(req.body);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },

    /**
     * @swagger
     * components:
     *  schemas:
     *      ArticleToUpdate:
     *          type: object
     *          properties:
     *              personId:
     *                  type: number
     *              title:
     *                  type: string
     *              description:
     *                  type: string
     *              entryDate:
     *                  type: string
     *                  format: date
     *              cost:
     *                  type: number
     *              condition:
     *                  type: string
     *          required:
     *              - personId
     */
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