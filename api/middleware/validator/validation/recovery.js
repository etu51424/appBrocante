import * as codeValidator from '../schemas/recovery.js'

const recoveryValidatorMiddleware = {
    recoveryCode : async (req, res, next) => {
        try {
            req.val = await codeValidator.recoveryCode.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export default recoveryValidatorMiddleware;