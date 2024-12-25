import {Router} from 'express';
import {verifyRecoveryCode, getRecoveryCode} from "../../controler/client.js";
import {default as RVM} from "../../middleware/validator/validation/recovery.js"
import {default as PVM} from "../../middleware/validator/validation/person.js"

const router = Router();

router.get('/:personId', PVM.personId,getRecoveryCode);
router.patch('/',RVM.recoveryCode, verifyRecoveryCode);

export default router;