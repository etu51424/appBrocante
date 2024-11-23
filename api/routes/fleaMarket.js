import {Router} from "express";
import {createFleaMarket, getFleaMarket, updateFleaMarket, deleteFleaMarket} from "../controler/fleaMarket.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as FVM} from '../middleware/validator/validation/fleaMarket.js'

const router = Router();

router.post('/', jwtCheck, FVM.fleaMarketToAdd, createFleaMarket);
router.get('/:fleaMarketId', jwtCheck, FVM.fleaMarketId, getFleaMarket);
router.patch('/', jwtCheck, FVM.fleaMarketToUpdate, updateFleaMarket);
router.delete('/:fleaMarketId', jwtCheck, FVM.fleaMarketToDelete, deleteFleaMarket);

export default router;