import {Router} from "express";
import {getSlot} from "../controler/slot.js";

const router = Router();

router.get('/:id/:fleaMarketId', getSlot);

export default router;