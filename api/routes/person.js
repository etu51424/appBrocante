import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson} from "../controler/person.js";

import {authBasic} from "../middleware/identification.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

router.post('/', authBasic, PVM.personToAdd, createPerson);
router.get('/:personId', authBasic, PVM.personId, getPerson);
router.patch('/', authBasic, PVM.personToUpdate, updatePerson);
router.delete('/:personId', authBasic, PVM.personToDelete, deletePerson);

export default router;