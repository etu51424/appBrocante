import {Router} from "express";
import {createInterest, getInterest, updateInterest, deleteInterest} from "../controler/interest.js";

import {authBasic} from '../middleware/identification.js';
import {default as IVM} from '../middleware/validator/validation/interest.js'

const router = Router();

router.post('/', IVM.interestToAdd, createInterest);
router.get('/:fleaMarketId/:personId', IVM.interestId, getInterest);
router.patch('/', IVM.interestToUpdate, updateInterest);
router.delete('/:fleaMarketId/:personId', IVM.interestToDelete, deleteInterest);

export default router;