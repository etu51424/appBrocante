import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as AVM} from '../../../middleware/validator/validation/article.js';
import {createArticle, updateArticle, deleteArticle, getAllArticles, getArticle} from "../../../controler/article.js";

const router = Router();

router.post("/", jwtCheck, admin, notBanned,AVM.articleToAdd, createArticle);
router.get("/all", jwtCheck, admin, notBanned, getAllArticles);
router.get("/", jwtCheck, admin, notBanned, AVM.articleId, getArticle);
router.patch("/", jwtCheck, admin, notBanned, AVM.articleToUpdate, updateArticle);
router.delete("/", jwtCheck, admin, notBanned, AVM.articleId, deleteArticle);

export default router;