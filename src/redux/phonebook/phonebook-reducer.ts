import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
    findContact,
    getContactsSuccess,
    getContactsRequest,
    getContactsError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
} from './phonebook-actions';

const items = createReducer([], builder => {
    builder
        .addCase(getContactsSuccess, (_, { payload }) => payload)
        // [getContactsSuccess]: (_, { payload }) => payload,
        .addCase(addContactSuccess, (state, { payload }) => [...state, payload])
        // [addContactSuccess]: (state, { payload }) => [...state, payload],
        .addCase(deleteContactSuccess, (state, { payload }) => [
            ...state.filter(({ id }) => id !== payload),
        ]);
    // [deleteContactSuccess]: (state, { payload }) => [
    //     ...state.filter(({ id }) => id !== payload),
    // ],
});

const filter = createReducer('', builder => {
    builder.addCase(findContact, (_, { payload }) => payload);
});

const isLoading = createReducer(false, builder => {
    builder
        .addCase(getContactsRequest, (_, __) => true)
        .addCase(getContactsSuccess, (_, __) => false)
        .addCase(getContactsError, (_, __) => false)
        .addCase(addContactRequest, (_, __) => true)
        .addCase(addContactSuccess, (_, __) => false)
        .addCase(addContactError, (_, __) => false)
        .addCase(deleteContactRequest, (_, __) => true)
        .addCase(deleteContactSuccess, (_, __) => false)
        .addCase(deleteContactError, (_, __) => false);
});

const onError = createReducer('', builder => {
    builder
        .addCase(
            getContactsError,
            (_, __) => 'Something went wrong, try again later',
        )
        .addCase(getContactsRequest, (_, __) => '')
        .addCase(
            addContactError,
            (_, __) => 'Something went wrong, try again later',
        )
        .addCase(addContactRequest, (_, __) => '')
        .addCase(
            deleteContactError,
            (_, __) => 'Something went wrong, try again later',
        )
        .addCase(deleteContactRequest, (_, __) => '');
});

export default combineReducers({
    items,
    filter,
    isLoading,
    onError,
});
