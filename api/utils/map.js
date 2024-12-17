// Fonction pour obtenir les coordonnées d'une adresse
async function getCoordinates(address, apiKey) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
    } else {
        throw new Error("Adresse non trouvée");
    }
}

// Fonction pour calculer la distance entre deux coordonnées (en kilomètres)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // La distance en kilomètres
}

async function getDistance(address1, address2, apiKey) {
    try {
        const { lat: lat1, lng: lon1 } = await getCoordinates(address1, apiKey);
        const { lat: lat2, lng: lon2 } = await getCoordinates(address2, apiKey);
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        console.log(`La distance entre les deux adresses est de ${distance.toFixed(2)} km`);
    } catch (error) {
        console.error(error.message);
    }
}

// Utilisation de l'API avec vos adresses




export const getMap = async () => {
    const apiKey = 'ec317447d52247a1bbcffb70f519cf0d';
    console.log(await getDistance('40, rue de gueulette', 'Vedrin', apiKey));
}
