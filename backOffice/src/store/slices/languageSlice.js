//stores everything related to the language 
import { createSlice } from '@reduxjs/toolkit'

import enDictData from "../../translations/en.json";
import frDictData from "../../translations/fr.json";
import nlDictData from "../../translations/nl.json";

//const loadEnDict = () => JSON.parse(JSON.stringify(enDictData));
//const loadFrDict = () => JSON.parse(JSON.stringify(frDictData));
//const loadNlDict = () => JSON.parse(JSON.stringify(enDictData));

const dicts = {
    en: enDictData,
    fr: frDictData,
    nl: nlDictData,
};


const getLangDict = (langCode) => {
    return dicts[langCode];
}

/*
const getLangDict = async (langCode) => {
  switch (langCode) {
    case "fr":
      return (await import("../../../public/translations/fr.json")).default;
    case "nl":
      return (await import("../../../public/translations/nl.json")).default;
    case "en":
    default:
      return (await import("../../../public/translations/en.json")).default;
  }
};*/


export const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: {
        language: "fr",
        langDict: getLangDict("fr"),
    },
    reducers: {
        changeLanguage: (state, action) => {
            const langCode = action.payload.langCode; //const langCode = action.langCode;
            //console.log("action.payload " + JSON.stringify(action.payload) + " received in reducer slice");
            state.language = langCode;
            state.langDict = getLangDict(langCode);
            //console.log("new state.langDict: " + JSON.stringify(state.langDict));
        },
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;