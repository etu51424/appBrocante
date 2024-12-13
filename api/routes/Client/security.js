import {Router} from 'express';
import {verifyRecoveryCode, getRecoveryCode} from "../../controler/client.js";
import {himself} from "../../middleware/authorization/mustBe.js";
import {default as RVM} from "../../middleware/validator/validation/recovery.js"

const router = Router();

router.get('/', getRecoveryCode);
router.patch('/', RVM.recoveryCode, himself, verifyRecoveryCode);

export default router;