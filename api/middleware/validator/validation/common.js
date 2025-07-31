import * as commonValidator from '../schemas/common.js';

const commonValidatorMiddleware = {
    verifyId: async (req, res, next) => {
        try{
            req.val = await commonValidator.idToVerify.validate(req.body);
            next();
        } catch(err){
            res.status(400).send(err.messages);
        }
    }
}

export default commonValidatorMiddleware;