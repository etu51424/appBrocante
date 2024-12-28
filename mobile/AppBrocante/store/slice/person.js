import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        personId : null,
        username : null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        address: null,
    },
    reducers: {
        login: (state, action) => {
            if (action.payload) {
                state.personId = action.payload.personId;
                state.username = action.payload.username;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
                state.phoneNumber = action.payload.phoneNumber;
                state.address = action.payload.address;
            }
            else {
                throw new Error(`No payload found`)
            }
        },
        read: (state) => {
            return state.user;
        },
        update: (state, action) => {
            if (action.payload) {
                Object.assign(state, {
                    firstName: action.payload.firstName || state.firstName,
                    lastName: action.payload.lastName || state.lastName,
                    email: action.payload.email || state.email,
                    phoneNumber: action.payload.phoneNumber || state.phoneNumber,
                    address: action.payload.address || state.address,
                });
            }
            else {
                throw new Error(`No payload found`)
            }
        },
        logout: (state) => {
            state.personId = null;
            state.username = null;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.phoneNumber = null;
            state.address = null;
        },
    }
})

export const selectPersonId = (state) => state.user.personId;
export const selectIsAuthenticated = (state) => !!state.user.personId;

export const { login, read, update,logout} = userSlice.actions;

export default userSlice.reducer;