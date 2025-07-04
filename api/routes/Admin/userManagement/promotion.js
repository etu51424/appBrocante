import {Router} from 'express';
import {demotePersonAdmin, promotePersonAdmin} from "../../../controler/client.js";
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as PVM} from '../../../middleware/validator/validation/person.js'

const router = Router();

router.patch('/promote/:personId', jwtCheck, admin, notBanned, PVM.personId, promotePersonAdmin);
router.patch('/demote/:personId', jwtCheck, admin, notBanned, PVM.personId, demotePersonAdmin);

export default router;