import {Router} from "express";
import {createFleaMarket, getFleaMarket, updateFleaMarket, deleteFleaMarket} from "../controler/fleaMarket.js";

import {authBasic} from '../middleware/identification.js';
import {default as FVM} from '../middleware/validator/validation/fleaMarket.js'

const router = Router();

router.post('/', FVM.fleaMarketToAdd, createFleaMarket);
router.get('/:fleaMarketId', FVM.fleaMarketId, getFleaMarket);
router.patch('/', FVM.fleaMarketToUpdate, updateFleaMarket);
router.delete('/:fleaMarketId', FVM.fleaMarketToDelete, deleteFleaMarket);

export default router;