// crée un utilisateur
export const createPerson = async (SQLClient) => {

}

// renvoie un utilisateur par l'identifiant
export const readPerson = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM person WHERE id = $1", [id]);
    return rows[0];
}

// update un utilisateur
export const updatePerson = async (SQLClient, {id}) => {

}

// supprime un utilisateur par l'identifiant
export const deletePerson = async (SQLClient, {id}) => {

}


