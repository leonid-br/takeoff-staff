import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, fetchCurrentUser } from './auth-operations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [register.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [register.rejected](state, action) {
            state.error = action.payload;
        },
        [register.pending](state, action) {
            state.error = '';
        },
        [login.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [login.rejected](state, _) {
            state.user = { user: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            alert('Wrong username or password. Please try again');
            console.log('error!');
        },
        [logout.fulfilled](state, _) {
            state.user = { user: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
    },
});

export default authSlice.reducer;
