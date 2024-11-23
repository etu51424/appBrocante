import {Router} from "express";
import {createSlot, getSlot, updateSlot, deleteSlot} from "../controler/slot.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as SVM} from '../middleware/validator/validation/slot.js'
const router = Router();

router.post('/', jwtCheck, SVM.slotToAdd, createSlot);
router.get('/:id', jwtCheck, SVM.slotId, getSlot);
router.patch('/', jwtCheck, SVM.slotToUpdate, updateSlot);
router.delete('/:id', jwtCheck, SVM.slotToDelete,deleteSlot);

export default router;