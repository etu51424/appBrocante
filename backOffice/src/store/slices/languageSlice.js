import { createSlice } from '@reduxjs/toolkit'
import enDictData from "../../translations/en.json";
import frDictData from "../../translations/fr.json";
import nlDictData from "../../translations/nl.json";

const dicts = {
    en: enDictData,
    fr: frDictData,
    nl: nlDictData,
};


const getLangDict = (langCode) => {
    return dicts[langCode];
}


export const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: {
        language: "fr",
        langDict: getLangDict("fr"),
    },
    reducers: {
        changeLanguage: (state, action) => {
            const langCode = action.payload.langCode;
            state.language = langCode;
            state.langDict = getLangDict(langCode);
        },
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;