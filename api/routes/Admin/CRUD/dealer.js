import {Router} from 'express';
import {jwtCheck} from "../../../middleware/identification/jwt.js";
import {admin, notBanned} from "../../../middleware/authorization/mustBe.js";
import {default as DVM} from '../../../middleware/validator/validation/dealer.js';
import {default as LVM} from '../../../middleware/validator/validation/limits.js';
import {createDealer, updateDealer, deleteDealer, getDealer, getAllDealers} from "../../../controler/dealer.js";


const router = Router();

/**
 * @swagger
 * /admin/dealer:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Dealer
 *      description: This route is used to create a new dealer in the system with admin access.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DealerToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/DealerAdded'
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
 * /admin/dealer/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Dealer
 *      description: This route is used to get a dealer in the system with admin access.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: number
 *              description: The ID of the dealer to fetch
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getDealer'
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
 * /admin/dealer/all:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Dealer
 *      description: This route is used to get all the dealers in the system with admin access.
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
 *              $ref: '#/components/responses/getAllDealers'
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
 * /admin/dealer:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Dealer
 *      description: This route is used to update a dealer in the system with admin access.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DealerToUpdate'
 *      responses:
 *          204:
 *              description: Dealer updated
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
 * /admin/dealer/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Dealer
 *      description: This route is used to delete a dealer in the system with admin access.
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the Dealer to delete
 *      responses:
 *          204:
 *              description: Dealer deleted
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

router.post("/", jwtCheck, admin, notBanned, DVM.dealerToAdd, createDealer);
router.get("/all", jwtCheck, admin, notBanned, LVM.paginationLimits, getAllDealers);
router.get("/:personId", jwtCheck, admin, notBanned, DVM.dealerId, getDealer);
router.patch("/", jwtCheck, admin, notBanned, DVM.dealerToUpdate, updateDealer);
router.delete("/:personId", jwtCheck, admin, notBanned, DVM.dealerId, deleteDealer);

export default router;