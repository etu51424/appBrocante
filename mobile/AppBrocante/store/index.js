import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/person';
import languageReducer from "./slice/language";

const store = configureStore({
    reducer: {
        user: userReducer,
        language: languageReducer,
    }
});

console.log("Initial state dans store/index.js :", store.getState()); 
export default store;