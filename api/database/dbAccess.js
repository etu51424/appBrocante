import "dotenv/config";
import pg from "pg";


const pgPool = new pg.Pool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME
});

export const pool = {
    query: async (query, params) => {
        try {
            return await pgPool.query(query, params);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    end : () => {
        return pgPool.end();
    },
    connect : () => {
        try {
            return pgPool.connect();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

process.on("exit", () => {
    pgPool.end().then(() => console.log("pool closed"));
});