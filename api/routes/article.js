import {Router} from "express";
import {createArticle, getArticle, updateArticle, deleteArticle} from "../controler/article.js";
import {jwtCheck} from "../middleware/jwt.js";
import {default as AVM} from '../middleware/validator/validation/article.js'

const router = Router();

router.post('/', jwtCheck, AVM.articleToAdd, createArticle);
router.get('/:id', jwtCheck, AVM.articleId, getArticle);
router.patch('/', jwtCheck, AVM.articleToUpdate, updateArticle);
router.delete('/:id', jwtCheck, AVM.articleToDelete, deleteArticle);

export default router;