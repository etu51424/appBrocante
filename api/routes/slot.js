import {Router} from "express";
import {createSlot, getSlot, updateSlot, deleteSlot} from "../controler/slot.js";
import {default as SVM} from '../middleware/validator/validation/slot.js'
const router = Router();

router.post('/', SVM.slotToAdd, createSlot);
router.get('/:id/:fleaMarketId', SVM.slotId, getSlot);
router.patch('/', SVM.slotToUpdate, updateSlot);
router.delete('/:id/:fleaMarketId', SVM.slotToDelete,deleteSlot);

export default router;