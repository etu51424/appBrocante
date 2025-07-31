export const verifyIdExistence = async (SQLClient,{id, tableName, idName = 'id'}) => {
    try {
        const result = await SQLClient.query(
            `SELECT EXISTS (SELECT 1 FROM ${tableName} WHERE ${idName} = $1)`,
            [id]
        );
        // Renvoie juste true ou false pour faciliter la vie du client
        return result.rows[0].exists;
    } catch (err) {
        throw new Error(`Error while verifying ID existence: ${err.message}`);
    }
};
