import {Router} from "express";
import {promotePersonAdmin, demotePersonAdmin} from "../controler/person.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

router.patch('/promote/:personId', jwtCheck, PVM.personId, promotePersonAdmin);
router.patch('/demote/:personId', jwtCheck, PVM.personId, demotePersonAdmin);

export default router;