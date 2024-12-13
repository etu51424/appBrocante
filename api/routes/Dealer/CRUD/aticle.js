import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {dealer, himself, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as AVM} from '../../../middleware/validator/validation/article.js';
import {createArticle, updateArticle, deleteArticle} from "../../../controler/article.js";

const router = Router();

router.post("/", jwtCheck, dealer, notBanned, AVM.articleToAdd, himself, createArticle);
router.patch("/", jwtCheck, dealer, notBanned, AVM.articleToUpdate, himself, updateArticle);
router.delete("/", jwtCheck, dealer, notBanned, AVM.articleId, himself, deleteArticle);

export default router;