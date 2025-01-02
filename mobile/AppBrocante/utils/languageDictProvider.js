import enDict from "../translations/en.json";
import frDict from "../translations/fr.json";
import nlDict from "../translations/nl.json";


const languageDictProvider = (langCode) => {
    const dictionaries = { fr: frDict, en: enDict, nl: nlDict};

    if (!dictionaries[langCode]) {
        console.error(`Pas de dico dont le lang code est : ${langCode}`);
        return {}; // retourner quand un meme un dictionnaire, mais vide, pour éviter les crashs
      }

    return dictionaries[langCode];
}


export default languageDictProvider;