import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {dealer, himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as SVM} from '../../../middleware/validator/validation/slot.js'
import {createSlot, updateSlot, deleteSlot} from "../../../controler/slot.js";

const router = Router();

router.post("/", jwtCheck, dealer, notBanned, SVM.slotToAdd, himself, createSlot);
router.patch("/", jwtCheck, dealer, notBanned, SVM.slotToUpdate, himself, updateSlot);
router.delete("/", jwtCheck, dealer, notBanned, SVM.slotId, himself, deleteSlot);

export default router;