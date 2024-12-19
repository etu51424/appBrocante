import {Router} from 'express';
import {default as adminRouter} from './admin/index.js';
import {default as dealerRouter} from './dealer/index.js';
import {default as clientRouter} from './client/index.js';

const router = Router();

// Dispatch entre les différents types de routes
router.use("/admin", adminRouter);
router.use("/client", clientRouter);
router.use("/dealer", dealerRouter);

export default router;