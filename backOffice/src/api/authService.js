const API_BASE_URL = "http://localhost:3001/api/v1";

export const createUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/person`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json(); // Retourne l'ID ou autre information
};

export const login = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/client/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to login");
    return response.json(); // Retourne le token
};

/*


const API_BASE_URL = "http://localhost:3001/api/v1";

// 1. Créer un utilisateur pour pouvoir se connecter à la db
export const createUser = async (userData) => {
 
    const response = await fetch(
        `${API_BASE_URL}/person`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }
    );
    
    //le status n'est pas 200 à 299 (success)
    if (!response.ok) {
        console.log(`Echec à créer l'user.`);
    }
    console.log(`Status : ${response.status}`);
    
    return response.json(); // Retourne l'ID ou autre information
};

// Se login avec l'id de l'useur obtenu du server (avec la methode createUser) afn d 'obtenir le token
export const login = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/client/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    //le status n'est pas 200 à 299 (success)
    // Vérifiez si la réponse est hors de la plage 200-299
    if (!response.ok) {
        // Créez une erreur personnalisée avec les détails nécessaires
        const error = new Error(`Erreur lors de la tentative de login : ${response.statusText}`);
        console.log(`Erreur de login.`);
        error.response = response; // Ajoutez la réponse complète à l'erreur
        throw error; // Levez l'erreur
    }
    console.log(`Status : ${response.status}`);
    console.log("Reponse recue :" + response); 
    //la repons recue est au format {id: num}
        
    return response.json(); // Retourne le token
};
*/