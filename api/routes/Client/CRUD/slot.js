import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {default as FMVM} from '../../../middleware/validator/validation/fleaMarket.js';
import {getAllSlotsByFleaMarketId} from "../../../controler/slot.js";

const router = Router();

// pour récupérer tous les slots d'une brocante
router.get('/', jwtCheck, FMVM.fleaMarketId, getAllSlotsByFleaMarketId);

export default router;