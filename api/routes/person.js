import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson} from "../controler/person.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const router = Router();

router.post('/', jwtCheck, PVM.personToAdd, createPerson);
router.get('/:personId', jwtCheck, PVM.personId, getPerson);
router.patch('/', jwtCheck, PVM.personToUpdate, updatePerson);
router.delete('/:personId', jwtCheck, PVM.personToDelete, deletePerson);

export default router;