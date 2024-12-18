import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as IVM} from '../../../middleware/validator/validation/interest.js'
import {default as FMVM} from '../../../middleware/validator/validation/fleaMarket.js';
import {himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {createInterest, updateInterest, deleteInterest, getAllInterestsByFleaMarketId} from "../../../controler/CRUD/interest.js";

const router = Router();
// pour récupérer tous les intérets d'une brocante
router.get('/:fleaMarketId', jwtCheck, FMVM.fleaMarketId, getAllInterestsByFleaMarketId);
router.post('/', jwtCheck, notBanned, IVM.interestToAdd, himself, createInterest); // pour créer son intéret
router.patch('/', jwtCheck, notBanned, IVM.interestToUpdate, himself, updateInterest); // pour modifier un de ses interets
router.delete('/:fleaMarketId', jwtCheck, notBanned, FMVM.fleaMarketId, himself, deleteInterest); // pour supprimer un de ses intéret

export default router;