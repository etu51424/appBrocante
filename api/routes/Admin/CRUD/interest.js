import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as IVM} from '../../../middleware/validator/validation/interest.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {
    createInterest,
    updateInterest,
    getInterest,
    getAllInterests,
    deleteInterest,
    interestDispatchSearch
} from "../../../controler/CRUD/interest.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned, IVM.interestToAdd, createInterest);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllInterests);
router.get("/search", jwtCheck, admin, notBanned, LVM.paginationLimits, IVM.interestToSearch, interestDispatchSearch);
router.get("/:fleaMarketId/:personId", jwtCheck, admin, notBanned, IVM.interestId, getInterest);
router.patch("/", jwtCheck, admin, notBanned, IVM.interestToUpdate, updateInterest);
router.delete("/:fleaMarketId/:personId", jwtCheck, admin, notBanned, IVM.interestId, deleteInterest);

export default router;