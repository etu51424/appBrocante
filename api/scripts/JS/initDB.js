import {readFileSync} from "node:fs";
import {pool} from "../../database/dbAccess.js";
import {hash} from "../../utils/hash.js";

(async () => {
    try {
        // lire et executer DB.sql pour init la db
        const requests = readFileSync("./scripts/SQL/DB.sql", { encoding: "utf-8" });
        await pool.query(requests);

        // récup les users avec leurs mdp non-hashés
        const { rows: users } = await pool.query("SELECT id, password FROM person");

        // hacher les mots de passe et maj la db
        for (const user of users) {
            //console.log("Password par défaut non hashé: " + user.password);
            const hashedPassword = await hash(user.password);
            await pool.query("UPDATE person SET password = $1 WHERE id = $2", [hashedPassword, user.id]);
        }

    } catch (e) {
        console.error("Erreur :", e);
    }
    // pool est fermé automatiquement par node.js 
})();