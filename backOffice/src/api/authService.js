const API_BASE_URL = "http://localhost:3001/api/v1";

export const createUser = async (userData) => {
    console.log("entre dans createuser");
    const response = await fetch(`${API_BASE_URL}/person`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    console.log("Reponse construite :\nMethode : " + response.type + "\nHeaders :" + response.headers + "\nBody " + response.body);
    if (!response.ok) throw new Error(`Failed to create user. Status: ${response.status}`);
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
