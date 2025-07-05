// Fonction de retry exponentiel
export const exponentialRetry = async (fn, maxRetries = 5, initialDelay = 1000, multiplier = 2) => {
    let attempt = 0;
    let delay = initialDelay;

    while (attempt < maxRetries) {
        try{
            return await fn()
        } catch(err) {
            const status = err?.response?.status || err.status || null;

            if (status && (status >= 400 && status < 500)) {
                throw new Error(`Erreur client ${status}: ${err.message} - Abandon du retry`);
            }

            attempt++;
            console.log(attempt + " " + maxRetries);
            if (attempt >= maxRetries) {
                throw new Error(`Échec après ${maxRetries} tentatives : ${err.message}`);
            }

            console.warn(`Retry ${attempt}/${maxRetries} dans ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= multiplier;
        }
    }
};
