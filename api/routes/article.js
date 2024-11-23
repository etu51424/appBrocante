import {Router} from "express";
import {createArticle, getArticle, updateArticle, deleteArticle} from "../controler/article.js";

import {authBasic} from '../middleware/identification.js';
import {default as AVM} from '../middleware/validator/validation/article.js'

const router = Router();

router.post('/', AVM.articleToAdd, createArticle);
router.get('/:id', AVM.articleId, getArticle);
router.patch('/', AVM.articleToUpdate, updateArticle);
router.delete('/:id', AVM.articleToDelete, deleteArticle);

export default router;