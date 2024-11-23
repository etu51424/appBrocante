import {Router} from "express";
import {createInterest, getInterest, updateInterest, deleteInterest} from "../controler/interest.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as IVM} from '../middleware/validator/validation/interest.js'

const router = Router();

router.post('/', jwtCheck, IVM.interestToAdd, createInterest);
router.get('/:fleaMarketId/:personId', jwtCheck, IVM.interestId, getInterest);
router.patch('/', jwtCheck, IVM.interestToUpdate, updateInterest);
router.delete('/:fleaMarketId/:personId', jwtCheck, IVM.interestToDelete, deleteInterest);

export default router;