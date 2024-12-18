import * as datesValidator from '../schemas/dates.js';

const datesValidatorMiddleware = {
    dates: async (req, res, next) => {
        try {
            req.val = await datesValidator.dates.validate(req.query);
            next();
        } catch(e) {
            res.status(400).send(e.messages);
        }
    },
};

export default datesValidatorMiddleware;