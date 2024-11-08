import {Router} from 'express';
import {default as personRouter} from './person.js';
import {default as articleRouter} from './article.js';
import {default as dealerRouter} from './dealer.js';
import {default as fleaMarketRouter} from './fleaMarket.js';
import {default as interestsRouter} from './interest.js';
import {default as slotRouter} from './slot.js';

const router = Router();

router.use("/person", personRouter);
router.use("/article", articleRouter);
router.use("/dealer", dealerRouter);
router.use("/fleaMarket", fleaMarketRouter);
router.use("/interests", interestsRouter);
router.use("/slot", slotRouter);


export default router;