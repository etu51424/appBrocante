import {Router} from "express";
import {createSlot, getSlot, updateSlot, deleteSlot} from "../controler/slot.js";

import {authBasic} from '../middleware/identification.js';
import {default as SVM} from '../middleware/validator/validation/slot.js'
const router = Router();

router.post('/', SVM.slotToAdd, createSlot);
router.get('/:id', SVM.slotId, getSlot);
router.patch('/', SVM.slotToUpdate, updateSlot);
router.delete('/:id', SVM.slotToDelete,deleteSlot);

export default router;