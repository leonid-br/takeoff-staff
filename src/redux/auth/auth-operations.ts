import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface IToken {
    set(token: string): void;
    unset(token?: string): void;
}

interface ICredentials {
    user: {
        name: string;
        password: string;
    };
    token: string;
}

interface IUser {
    user: { name: string; email: string };
    token: string;
    isLoggedIn: boolean;
}

interface IContacts {
    items: { id: string; name: string; phone: string };
    filter: string;
    isLoading: boolean;
}

interface IState {
    auth: IUser;
    contacts: IContacts;
}

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const token: IToken = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset(token) {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk(
    'phonebook/signUp',
    async (credentials: ICredentials, { rejectWithValue }) => {
        try {
            const { data }: { data: ICredentials } = await axios.post(
                `/users/signup`,
                credentials,
            );
            token.set(data.token);
            return data;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    },
);

export const login = createAsyncThunk('phonebook/login', async credentials => {
    try {
        const { data }: { data: ICredentials } = await axios.post(
            `/users/login`,
            credentials,
        );

        token.set(data.token);
        return data;
    } catch (error: unknown) {
        const navigate = useNavigate();

        navigate('/');

        console.log(error);
    }
});

export const logout = createAsyncThunk('phonebook/logout', async () => {
    try {
        await axios.post(`/users/logout`);
        token.unset();
    } catch (error: unknown) {
        console.log(error);
    }
});

export const fetchCurrentUser = createAsyncThunk(
    'phonebook/auth-refresh',
    async (_, { getState, rejectWithValue }) => {
        const state: IState = getState() as IState;
        const persistedToken: string = state.auth.token;

        if (persistedToken === null) {
            return rejectWithValue('Токена нет, уходим из fetchCurrentUser');
        }

        token.set(persistedToken);
        try {
            const { data } = await axios.get('/users/current');
            return data;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    },
);
