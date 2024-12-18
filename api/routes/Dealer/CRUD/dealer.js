import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {dealer, himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as DVM} from '../../../middleware/validator/validation/dealer.js'
import {updateDealer, deleteDealer} from "../../../controler/CRUD/dealer.js";

const router = Router();

router.patch("/", jwtCheck, dealer, notBanned, DVM.dealerToUpdate, himself, updateDealer);
router.delete("/", jwtCheck, dealer, notBanned, DVM.dealerId, himself, deleteDealer);

export default router;