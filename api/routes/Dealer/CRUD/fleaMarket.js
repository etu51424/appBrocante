import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {dealer, himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as FMVM} from '../../../middleware/validator/validation/fleaMarket.js'
import {createFleaMarket, updateFleaMarket, deleteFleaMarket} from "../../../controler/CRUD/fleaMarket.js";

const router = Router();

router.post("/", jwtCheck, dealer, notBanned, FMVM.fleaMarketToAdd, himself, createFleaMarket);
router.patch("/", jwtCheck, dealer, notBanned, FMVM.fleaMarketToUpdate, himself, updateFleaMarket);
router.delete("/", jwtCheck, dealer, notBanned, FMVM.fleaMarketId, himself, deleteFleaMarket);

export default router;