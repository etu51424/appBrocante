import {Router} from "express";
import {createPerson, getPerson, updatePerson, deletePerson} from "../controler/person.js";
import {authBasic} from "../middleware/identification.js";

const router = Router();

router.post('/', createPerson);
router.get('/:personId' ,getPerson);
router.patch('/', updatePerson);
router.delete('/:personId', deletePerson);

export default router;