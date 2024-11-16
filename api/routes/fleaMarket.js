import {Router} from "express";
import {createFleaMarket, getFleaMarket, updateFleaMarket, deleteFleaMarket} from "../controler/fleaMarket.js";

const router = Router();

router.post('/', createFleaMarket);
router.get('/:fleaMarketId', getFleaMarket);
router.patch('/', updateFleaMarket);
router.delete('/:fleaMarketId', deleteFleaMarket);

export default router;