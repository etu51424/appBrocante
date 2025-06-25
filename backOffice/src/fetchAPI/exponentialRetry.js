// Fonction de retry exponentiel
export const exponentialRetry = async (fn, retries = 5, delay = 1000) => {
    /*
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn(); // Tente l'opération
        } catch (error) {
            console.error(`Tentative ${attempt} échouée: ${error.message}`);

            if (attempt === retries) {
                throw new Error("Toutes les tentatives ont échoué.");
            }

            // Délai exponentiel + facteur aléatoire
            const exponentialDelay = delay * Math.pow(2, attempt - 1) + Math.random() * 100;
            console.log(`Attente de ${exponentialDelay.toFixed(0)} ms avant de réessayer...`);

            await new Promise(res => setTimeout(res, exponentialDelay));
        }
    }

     */
    return await fn();
};
