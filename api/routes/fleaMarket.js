import {Router} from "express";
import {createFleaMarket, getFleaMarket, updateFleaMarket, deleteFleaMarket} from "../controler/fleaMarket.js";

const router = Router();

router.post('/', createFleaMarket);
router.get('/:id', getFleaMarket);
router.patch('/', updateFleaMarket);
router.delete('/:id', deleteFleaMarket);

export default router;