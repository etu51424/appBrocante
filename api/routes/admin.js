import {Router} from "express";
import {promotePersonAdmin, demotePersonAdmin, banPerson, unbanPerson} from "../controler/person.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

// concernant la gestion des administrateurs
router.patch('/promote/:personId', jwtCheck, PVM.personId, promotePersonAdmin);
router.patch('/demote/:personId', jwtCheck, PVM.personId, demotePersonAdmin);

// // concerne les expulsions du système
router.patch("/ban/:personId", jwtCheck, PVM.personId, banPerson);
router.patch("/unban/:personId", jwtCheck, PVM.personId,unbanPerson);

export default router;