import {Router} from "express";
import {getInterest} from "../controler/interest.js";

const router = Router();

router.get('/:fleaMarketId/:personId', getInterest);

export default router;