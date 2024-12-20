import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js";
import nlDict from "../translations/nl/nl.js";

const languageDictProvider = (lang) => {
    switch(lang) {
        case 'fr':
            return frDict;
        case 'en':
            return enDict;
        case 'nl':
            return nlDict;
    }
}

export default languageDictProvider;