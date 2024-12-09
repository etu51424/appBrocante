import {Router} from 'express';
import {default as personRouter} from './person.js';
import {default as articleRouter} from './article.js';
import {default as dealerRouter} from './dealer.js';
import {default as fleaMarketRouter} from './fleaMarket.js';
import {default as interestsRouter} from './interest.js';
import {default as slotRouter} from './slot.js';
import {default as adminRouter} from './admin.js';
import {default as clientRouter} from './client.js'
import {default as avatarRouter} from './avatar.js'

const router = Router();

router.use("/person", personRouter);
router.use("/article", articleRouter);
router.use("/dealer", dealerRouter);
router.use("/fleaMarket", fleaMarketRouter);
router.use("/interest", interestsRouter);
router.use("/slot", slotRouter);
router.use("/admin", adminRouter);
router.use("/client", clientRouter);
router.use("/avatar", avatarRouter);


export default router;