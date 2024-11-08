import {Router} from "express";
import {getPerson} from "../controler/person.js";

const router = Router();

router.get('/:id', getPerson);

export default router;