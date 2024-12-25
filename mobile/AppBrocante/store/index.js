import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/person';

export default configureStore({
    reducer: {
        user: userReducer,
    }
});