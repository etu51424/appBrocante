export const statusCodes = async (response) => {
    switch (response.status) {
        // codes valides
        case 200:
        case 201:
        case 202:
        case 203:
        case 204:
            return true;
        // codes d'erreur
        case 400:
        case 401 :
        case 500:
            throw new Error(await response.text());
        case 404:
            throw new Error(`Element non trouvé`);
        default:
            throw new Error(`Code de retour inattendu : ${response.status}`);
    }
}