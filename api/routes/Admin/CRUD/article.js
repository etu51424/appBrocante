import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as AVM} from '../../../middleware/validator/validation/article.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticles,
    getArticle,
    getAllArticlesByTitle
} from "../../../controler/CRUD/article.js";

const router = Router();

/**
 * @swagger
 * /admin/article:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Article
 *      description: This route is used to create a new article in the system with admin access.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArticleToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ArticleAdded'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Authorization error
 *              content:
 *                   application/json:
 *                      schema:
 *                         type: object
 *                         oneOf:
 *                              - $ref: '#/components/responses/mustBeNotBanned'
 *                              - $ref: '#/components/responses/mustBeAdmin'
 *                      examples:
 *                          mustBeNotBanned:
 *                              summary: User is banned
 *                              value:
 *                                  message: "User is banned"
 *                          mustBeAdmin:
 *                              summary: User is not an admin
 *                              value:
 *                                  message: "User is not an admin"
 *          500:
 *              description: Error server
 */

/**
 * @swagger
 * /admin/article/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Article
 *      description: This route is used to get an article in the system with admin access.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: number
 *              description: The ID of the article to fetch
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getArticle'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Authorization error
 *              content:
 *                   application/json:
 *                      schema:
 *                         type: object
 *                         oneOf:
 *                              - $ref: '#/components/responses/mustBeNotBanned'
 *                              - $ref: '#/components/responses/mustBeAdmin'
 *                      examples:
 *                          mustBeNotBanned:
 *                              summary: User is banned
 *                              value:
 *                                  message: "User is banned"
 *                          mustBeAdmin:
 *                              summary: User is not an admin
 *                              value:
 *                                  message: "User is not an admin"
 *          500:
 *              description: Error server
 */

/**
 * @swagger
 * /admin/article/all:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Article
 *      description: This route is used to get all the articles in the system with admin access.
 *      parameters:
 *          - in: query
 *            name: limit
 *            required: false
 *            schema:
 *              type: number
 *              default: 10
 *              description: The limit of element by page
 *          - in: query
 *            name: page
 *            required: false
 *            schema:
 *              type: number
 *              default: 1
 *              description: The page of elements
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllArticles'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Authorization error
 *              content:
 *                   application/json:
 *                      schema:
 *                         type: object
 *                         oneOf:
 *                              - $ref: '#/components/responses/mustBeNotBanned'
 *                              - $ref: '#/components/responses/mustBeAdmin'
 *                      examples:
 *                          mustBeNotBanned:
 *                              summary: User is banned
 *                              value:
 *                                  message: "User is banned"
 *                          mustBeAdmin:
 *                              summary: User is not an admin
 *                              value:
 *                                  message: "User is not an admin"
 *          500:
 *              description: Error server
 */

/**
 * @swagger
 * /admin/article:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Article
 *      description: This route is used to update an article in the system with admin access.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArticleToUpdate'
 *      responses:
 *          204:
 *              description: Article updated
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Authorization error
 *              content:
 *                   application/json:
 *                      schema:
 *                         type: object
 *                         oneOf:
 *                              - $ref: '#/components/responses/mustBeNotBanned'
 *                              - $ref: '#/components/responses/mustBeAdmin'
 *                      examples:
 *                          mustBeNotBanned:
 *                              summary: User is banned
 *                              value:
 *                                  message: "User is banned"
 *                          mustBeAdmin:
 *                              summary: User is not an admin
 *                              value:
 *                                  message: "User is not an admin"
 *          500:
 *              description: Error server
 */

/**
 * @swagger
 * /admin/article/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Article
 *      description: This route is used to delete an article in the system with admin access.
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the Article to delete
 *      responses:
 *          204:
 *              description: Article deleted
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Authorization error
 *              content:
 *                   application/json:
 *                      schema:
 *                         type: object
 *                         oneOf:
 *                              - $ref: '#/components/responses/mustBeNotBanned'
 *                              - $ref: '#/components/responses/mustBeAdmin'
 *                      examples:
 *                          mustBeNotBanned:
 *                              summary: User is banned
 *                              value:
 *                                  message: "User is banned"
 *                          mustBeAdmin:
 *                              summary: User is not an admin
 *                              value:
 *                                  message: "User is not an admin"
 *          500:
 *              description: Error server
 */


router.post("/", jwtCheck, admin, notBanned, AVM.articleToAdd, createArticle);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllArticles);
router.get("/search", jwtCheck, admin, notBanned, LVM.paginationLimits, AVM.articleToSearch, getAllArticlesByTitle);
router.get("/:id", jwtCheck, admin, notBanned, AVM.articleId, getArticle);
router.patch("/", jwtCheck, admin, notBanned, AVM.articleToUpdate, updateArticle);
router.delete("/:id", jwtCheck, admin, notBanned, AVM.articleId, deleteArticle);

export default router;