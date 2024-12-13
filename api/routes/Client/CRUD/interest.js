import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as IVM} from '../../../middleware/validator/validation/interest.js'
import {himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {createInterest, updateInterest, deleteInterest} from "../../../controler/interest.js";

const router = Router();

router.get('/'); // pour récupérer tous les intérets
router.post('/', jwtCheck, notBanned, IVM.interestToAdd, himself, createInterest); // pour créer son intéret
router.patch('/', jwtCheck, notBanned, IVM.interestToUpdate, himself, updateInterest); // pour modifier un de ses interets
router.delete('/', jwtCheck, notBanned, IVM.interestId, himself, deleteInterest); // pour supprimer un de ses intéret

export default router;