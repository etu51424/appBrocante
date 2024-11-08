import {Router} from 'express';
import {default as personRouter} from './person.js';

const router = Router();

router.use("/person", personRouter);

export default router;