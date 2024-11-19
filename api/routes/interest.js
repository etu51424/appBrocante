import {Router} from "express";
import {createInterest, getInterest, updateInterest, deleteInterest} from "../controler/interest.js";

import {authBasic} from '../middleware/identification.js';
import {default as IVM} from '../middleware/validator/validation/interest.js'

const router = Router();

router.post('/', authBasic, IVM.interestToAdd, createInterest);
router.get('/:fleaMarketId/:personId', authBasic, IVM.interestId, getInterest);
router.patch('/', authBasic, IVM.interestToUpdate, updateInterest);
router.delete('/:fleaMarketId/:personId', authBasic, IVM.interestToDelete, deleteInterest);

export default router;