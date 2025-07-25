import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as PVM} from '../../../middleware/validator/validation/person.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {
    createPerson,
    getPerson,
    getAllPersons,
    deletePerson,
    updatePerson,
    getAllPersonsByUsername
} from "../../../controler/CRUD/person.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, PVM.personToAdd, createPerson);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllPersons);
router.get("/search", jwtCheck, admin, notBanned, LVM.paginationLimits, PVM.personToSearch, getAllPersonsByUsername);
router.get("/:personId", jwtCheck, admin, notBanned, PVM.personId, getPerson);
router.patch("/", jwtCheck, admin, notBanned, PVM.personToUpdate, updatePerson);
router.delete("/:personId", jwtCheck, admin, notBanned, PVM.personId, deletePerson);

export default router;