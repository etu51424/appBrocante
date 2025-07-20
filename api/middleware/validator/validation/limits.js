import * as limitsValidator from '../schemas/limits.js';


const limitsValidatorMiddleware = {
    paginationLimits: async (req, res, next) => {
        try {
            req.val = await limitsValidator.limits.validate(req.query);
            req.val.page = req.val.page || 1;
            req.val.limit = req.val.limit || 10;
            req.val.offset = (req.val.page - 1) * req.val.limit;
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
};

export default limitsValidatorMiddleware;