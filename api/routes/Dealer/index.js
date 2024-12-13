import {Router} from 'express';
import {default as articleRouter} from './CRUD/aticle.js';
import {default as dealerRouter} from './CRUD/dealer.js';
import {default as fleaMarketRouter} from './CRUD/fleaMarket.js';
import {default as slotRouter} from './CRUD/slot.js';

const router = Router();

router.use('/article', articleRouter);
router.use('/dealer', dealerRouter);
router.use('/fleaMarket', fleaMarketRouter);
router.use('/slot', slotRouter);

export default router;