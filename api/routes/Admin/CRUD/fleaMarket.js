import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as FMVM} from '../../../middleware/validator/validation/fleaMarket.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {createFleaMarket, getAllFleaMarkets, getFleaMarket, updateFleaMarket, deleteFleaMarket} from "../../../controler/fleaMarket.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, FMVM.fleaMarketToAdd, createFleaMarket);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllFleaMarkets);
router.get("/", jwtCheck, admin, notBanned, FMVM.fleaMarketId, getFleaMarket);
router.patch("/", jwtCheck, admin, notBanned, FMVM.fleaMarketToUpdate, updateFleaMarket);
router.delete("/", jwtCheck, admin, notBanned, FMVM.fleaMarketId, deleteFleaMarket);

export default router;
