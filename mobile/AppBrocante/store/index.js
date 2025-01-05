import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/person';
import languageReducer from "./slice/language";

export default configureStore({
    reducer: {
        user: userReducer,
        language: languageReducer,
    }
});