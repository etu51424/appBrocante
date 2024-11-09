import {Router} from "express";
import {createInterest, getInterest, updateInterest, deleteInterest} from "../controler/interest.js";


const router = Router();

router.post('/', createInterest);
router.get('/:fleaMarketId/:personId', getInterest);
router.patch('/', updateInterest);
router.delete('/:fleaMarketId/:personId', deleteInterest);

export default router;