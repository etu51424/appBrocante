import {Router} from 'express';
import {default as moderationRouter} from './userManagement/moderation.js';
import {default as promotionRouter} from './userManagement/promotion.js';
import {default as articleRouter} from './CRUD/article.js';
import {default as dealerRouter} from './CRUD/dealer.js';
import {default as fleaMarketRouter} from './CRUD/fleaMarket.js';
import {default as interestRouter} from './CRUD/interest.js';
import {default as personRouter} from './CRUD/person.js';
import {default as slotRouter} from './CRUD/slot.js';


const router = Router();

/*
------------------------------
            CRUD
------------------------------
 */

router.use("/article", articleRouter);
router.use("/dealer", dealerRouter);
router.use("/fleaMarket", fleaMarketRouter);
router.use("/interest", interestRouter);
router.use("/person", personRouter);
router.use("/slot", slotRouter);

/*
------------------------------
        MODERATION
------------------------------
 */

router.use("/moderation", moderationRouter);

/*
------------------------------
        PROMOTION
------------------------------
 */

router.use("/promotion", promotionRouter);

export default router;