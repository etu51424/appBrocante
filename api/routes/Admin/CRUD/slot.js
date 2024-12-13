import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as SVM} from '../../../middleware/validator/validation/slot.js';
import {createSlot, updateSlot, getSlot, getAllSlots, deleteSlot} from "../../../controler/slot.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, SVM.slotToAdd, createSlot);
router.get("/all", jwtCheck, admin, notBanned, getAllSlots);
router.get("/", jwtCheck, admin, notBanned, SVM.slotId, getSlot);
router.patch("/", jwtCheck, admin, notBanned, SVM.slotId, updateSlot);
router.delete("/", jwtCheck, admin, notBanned, SVM.slotId, deleteSlot);

export default router;