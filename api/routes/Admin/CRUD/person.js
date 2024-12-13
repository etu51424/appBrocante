import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as PVM} from '../../../middleware/validator/validation/person.js';
import {createPerson, getPerson, getAllPersons, deletePerson, updatePerson} from "../../../controler/person.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, PVM.personToAdd, createPerson);
router.get("/all", jwtCheck, admin, notBanned, getAllPersons);
router.get("/", jwtCheck, admin, notBanned, PVM.personId, getPerson);
router.patch("/", jwtCheck, admin, notBanned, PVM.personToUpdate, updatePerson);
router.delete("/", jwtCheck, admin, notBanned, PVM.personId, deletePerson);

export default router;