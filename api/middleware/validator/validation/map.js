import * as mapValidator from '../schemas/map.js';

const mapValidatorMiddleware = {
    mapRange: async (req, res, next) => {
        try {
            req.val = await mapValidator.mapRange.validate(req.query);
            req.val.range = req.val.range || 10;
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
};

export default mapValidatorMiddleware;