import { verifyIdExistence } from '../model/common.js';
import {pool} from "../database/dbAccess.js";

export const checkIdExistence = async (req, res) => {
    // Liste des tables autorisées pour éviter l'injection
    const allowedTables = ['flea_market', 'slot', 'person', 'interest', 'dealer', 'article']; // adapte selon ton app

    if (!allowedTables.includes(req.val.tableName)) {
        return res.status(400).json({ error: 'Invalid table name'});
    }

    try {
        const exists = await verifyIdExistence(pool, req.val);

        return res.status(200).json({ exists });
    } catch (err) {
        console.error('Error in checkIdExistsController:', err.message);
        return res.sendStatus(500);
    }
};
