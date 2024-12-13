import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {banPerson, unbanPerson} from "../../../controler/person.js";
import {Router} from 'express';
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as PVM} from '../../../middleware/validator/validation/person.js'

const router = Router();

router.patch("/ban", jwtCheck, admin, notBanned, PVM.personId, banPerson);
router.patch("/unban", jwtCheck, admin, notBanned, PVM.personId, unbanPerson);

export default router;

