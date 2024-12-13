import {readFileSync} from "node:fs";
import {pool} from "../../database/dbAccess.js";
import {hash} from "../../utils/hash.js";

(async () => {
    try {
        // lire et executer DB.sql pour init la db
        const requests = readFileSync("./scripts/SQL/DB.sql", { encoding: "utf-8" });
        await pool.query(requests);
    } catch (e) {
        console.error("Erreur :", e);
    }
    // pool est fermé automatiquement par node.js 
})();