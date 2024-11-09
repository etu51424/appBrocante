import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson} from "../controler/person.js";

const router = Router();

router.post('/', createPerson);
router.get('/:id', getPerson);
router.patch('/', updatePerson);
router.delete('/:id', deletePerson);

export default router;