import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, fetchCurrentUser } from './auth-operations';

interface IState {
    user: { name: string | null; email?: string | null };
    token: string | null;
    isLoggedIn: boolean;
    error: unknown;
}

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    error: null,
} as IState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
            })
            // [register.fulfilled](state, action) {
            //     state.user = action.payload.user;
            //     state.token = action.payload.token;
            //     state.isLoggedIn = true;
            // },
            .addCase(register.rejected, (state, { payload }) => {
                state.error = payload;
            })
            // [register.rejected](state, action) {
            //     state.error = action.payload;
            // },
            .addCase(register.pending, (state, _) => {
                state.error = '';
            })
            // [register.pending](state, action) {
            //     state.error = '';
            // },
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload!.user;
                state.token = payload!.token;
                state.isLoggedIn = true;
            })
            // [login.fulfilled](state, action) {
            //     state.user = action.payload.user;
            //     state.token = action.payload.token;
            //     state.isLoggedIn = true;
            // },
            .addCase(login.rejected, (state, { payload }) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
                alert('Wrong username or password. Please try again');
                console.log('error!');
            })
            // [login.rejected](state, _) {
            //     state.user = { user: null, email: null };
            //     state.token = null;
            //     state.isLoggedIn = false;
            //     alert('Wrong username or password. Please try again');
            //     console.log('error!');
            // },
            .addCase(logout.fulfilled, (state, _) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            // [logout.fulfilled](state, _) {
            //     state.user = { user: null, email: null };
            //     state.token = null;
            //     state.isLoggedIn = false;
            // },
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoggedIn = true;
            });
        // [fetchCurrentUser.fulfilled](state, action) {
        //     state.user = action.payload;
        //     state.isLoggedIn = true;
        // },
    },
});

export default authSlice.reducer;
