import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {dealer, himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as DVM} from '../../../middleware/validator/validation/dealer.js'
import {updateDealer, deleteDealer, getDealer} from "../../../controler/CRUD/dealer.js";

const router = Router();

router.patch("/", jwtCheck, dealer, notBanned, DVM.dealerToUpdate, himself, updateDealer);
router.get("/me", jwtCheck, dealer, notBanned, himself, getDealer);
router.delete("/", jwtCheck, dealer, notBanned, DVM.dealerId, himself, deleteDealer);

export default router;