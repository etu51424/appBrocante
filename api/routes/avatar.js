import {Router} from "express";
import multer from "multer";
import {createAvatar, deleteAvatar} from "../controler/avatar.js";
import {default as PVM} from "../middleware/validator/validation/person.js";

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000 // 700Ko
    },
    storage: storage
});

const router = Router();

router.post('/', upload.fields([{name: 'avatar', maxCount: 1}]), createAvatar);
router.get('/:personId');
router.patch('/');
router.delete('/:personId', deleteAvatar);

export default router;