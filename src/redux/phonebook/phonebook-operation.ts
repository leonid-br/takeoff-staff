import axios from 'axios';
import {
    getContactsRequest,
    getContactsSuccess,
    getContactsError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
} from './phonebook-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const getContacts = () => async dispatch => {
    dispatch(getContactsRequest());

    try {
        const { data } = await axios.get('/contacts');

        dispatch(getContactsSuccess(data));
    } catch (error) {
        dispatch(getContactsError(error.message));
    }
};

export const addContact = contact => dispatch => {
    dispatch(addContactRequest());

    axios
        .post('/contacts', contact)
        .then(({ data }) => dispatch(addContactSuccess(data)))
        .catch(error => dispatch(addContactError(error.message)));
};

export const deleteContactById = id => dispatch => {
    dispatch(deleteContactRequest());

    axios
        .delete(`/contacts/${id}`)
        .then(() => dispatch(deleteContactSuccess(id)))
        .catch(error => dispatch(deleteContactError(error)));
};
