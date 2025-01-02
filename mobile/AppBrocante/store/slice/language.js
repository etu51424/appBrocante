import { createSlice } from "@reduxjs/toolkit";
import languageDictProvider from "../../utils/languageDictProvider";

const initialState = {
    language: "fr",
    langDict: languageDictProvider("fr"),
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLanguage (state, action) {
            // retourne tjr un tout nouvel obj
            return {
                ...state,
                language: action.payload.value,
                langDict: languageDictProvider(action.payload.value), // pase uniquement le language code
            };
        }
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;