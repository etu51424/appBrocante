import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson} from "../controler/person.js";
import {authBasic} from "../middleware/identification.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

router.post('/', PVM.personToAdd, createPerson);
router.get('/:personId', PVM.personId ,getPerson);
router.patch('/', PVM.personToUpdate ,updatePerson);
router.delete('/:personId', PVM.personToDelete, deletePerson);

export default router;