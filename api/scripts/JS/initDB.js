import {readFileSync} from "node:fs";
import {pool} from "../../database/dbAccess.js";

const requests = readFileSync(
    "./scripts/SQL/DB.sql",
    {encoding: "utf-8"}
);


try {
    await pool.query(requests, []);
    console.log("done");
} catch (e) {
    console.error(e);
}