import {Router} from "express";
import multer from "multer";
import {addAvatar, deleteAvatar} from "../controler/avatar.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});

const router = Router();

router.post('/', upload.fields([{name: 'avatar', maxCount: 1}]), addAvatar);
router.delete('/', deleteAvatar);

export default router;