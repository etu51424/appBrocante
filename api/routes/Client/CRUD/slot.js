import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as FMVM} from '../../../middleware/validator/validation/fleaMarket.js';
import {getAllSlotsByFleaMarketId} from "../../../controler/CRUD/slot.js";

const router = Router();

// pour récupérer tous les slots d'une brocante
router.get('/:fleaMarketId', jwtCheck, FMVM.fleaMarketId, getAllSlotsByFleaMarketId);

export default router;