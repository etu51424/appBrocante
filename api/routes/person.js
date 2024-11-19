import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson, promotePersonAdmin, demotePersonAdmin} from "../controler/person.js";

import {authBasic} from "../middleware/identification.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

router.post('/', authBasic, PVM.personToAdd, createPerson);
router.get('/:personId', authBasic, PVM.personId, getPerson);
router.patch('/', authBasic, PVM.personToUpdate, updatePerson);
router.delete('/:personId', authBasic, PVM.personToDelete, deletePerson);
router.patch('/promote/:personId', PVM.personId,promotePersonAdmin);
router.patch('/demote/:personId', PVM.personId, demotePersonAdmin);

export default router;