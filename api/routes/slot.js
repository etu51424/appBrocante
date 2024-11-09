import {Router} from "express";
import {createSlot, getSlot, updateSlot, deleteSlot} from "../controler/slot.js";

const router = Router();

router.post('/', createSlot);
router.get('/:id/:fleaMarketId', getSlot);
router.patch('/', updateSlot);
router.delete('/:id/:fleaMarketId', deleteSlot);

export default router;