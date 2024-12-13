import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as DVM} from '../../../middleware/validator/validation/dealer.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {createDealer, updateDealer, deleteDealer, getDealer, getAllDealers} from "../../../controler/dealer.js";


const router = Router();

router.post("/", jwtCheck, admin, notBanned, DVM.dealerToAdd, createDealer);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllDealers);
router.get("/", jwtCheck, admin, notBanned, DVM.dealerId, getDealer);
router.patch("/", jwtCheck, admin, notBanned, DVM.dealerToUpdate, updateDealer);
router.delete("/", jwtCheck, admin, notBanned, DVM.dealerId, deleteDealer);

export default router;