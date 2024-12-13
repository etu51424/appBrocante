import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as IVM} from '../../../middleware/validator/validation/interest.js';
import {createInterest, updateInterest, getInterest, getAllInterests, deleteInterest} from "../../../controler/interest.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, IVM.interestToAdd, createInterest);
router.get("/all", jwtCheck, admin, notBanned, getAllInterests);
router.get("/", jwtCheck, admin, notBanned, IVM.interestId, getInterest);
router.patch("/", jwtCheck, admin, notBanned, IVM.interestToUpdate, updateInterest);
router.delete("/", jwtCheck, admin, notBanned, IVM.interestId, deleteInterest);

export default router;