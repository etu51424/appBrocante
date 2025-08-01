import toast from 'react-hot-toast';

// Fonction de retry exponentiel
export const exponentialRetry = async (fn, maxRetries = 5, initialDelay = 1000, multiplier = 2) => {
    let attempt = 0;
    let delay = initialDelay;

    while (attempt < maxRetries) {
        try{
            return await fn();
        } catch(err) {
            const errorText = await err.response.text() || "";
            const status = err?.response?.status || err.status || null;

            if (status && (status >= 400 && status < 500)) {
                // Pas de retry pour les erreurs clients
                toast.error(`Erreur client ${status}: ${err.message}`);
                throw new Error(`Erreur client ${status}: ${err.message} - Abandon du retry`);
            }

            if (status === null) {
                console.warn('Erreur réseau, tentative de retry...');
            }

            attempt++;

            if (attempt >= maxRetries) {
                toast.error(`Échec après ${maxRetries} tentatives : ${err.message}`);
                err.message = `Échec après ${maxRetries} tentatives : ${err.message}.\nServer message : ${errorText}`;
                throw err;
            }

            console.warn(`Retry ${attempt}/${maxRetries} dans ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= multiplier;
        }
    }
};
