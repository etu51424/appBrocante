import {Router} from "express";
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as CVM} from "../../../middleware/validator/validation/common.js"
import {checkIdExistence} from "../../../controler/common.js";

const router = Router();

router.post('/', jwtCheck ,admin, notBanned, CVM.verifyId, checkIdExistence);

export default router;