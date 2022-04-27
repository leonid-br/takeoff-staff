import { createAction } from '@reduxjs/toolkit';
import { stringify } from 'querystring';

export const getContactsRequest = createAction('phonebook/getContactsRequest');
export const getContactsSuccess = createAction('phonebook/getContactsSuccess');
export const getContactsError = createAction('phonebook/getContactsError');

export const addContactRequest = createAction('phonebook/addContactRequest');
export const addContactSuccess = createAction('phonebook/addContactSuccess');
export const addContactError = createAction('phonebook/addContactError');

export const deleteContactRequest = createAction(
    'phonebook/deleteContactRequest',
);
export const deleteContactSuccess = createAction(
    'phonebook/deleteContactSuccess',
);
export const deleteContactError = createAction('phonebook/deleteContactError');

export const findContact = createAction('phonebook/filter');
