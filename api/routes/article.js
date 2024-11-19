import {Router} from "express";
import {createArticle, getArticle, updateArticle, deleteArticle} from "../controler/article.js";

import {authBasic} from '../middleware/identification.js';
import {default as AVM} from '../middleware/validator/validation/article.js'

const router = Router();

router.post('/', authBasic, AVM.articleToAdd, createArticle);
router.get('/:id', authBasic, AVM.articleId, getArticle);
router.patch('/', authBasic, AVM.articleToUpdate, updateArticle);
router.delete('/:id', authBasic, AVM.articleToDelete, deleteArticle);

export default router;