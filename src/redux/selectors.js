export const getItems = state => state.contacts.items;
export const getAllContacts = state => state.contacts;
export const loadingGet = state => state.contacts.isLoading;
export const isLoggedInGet = state => state.auth.isLoggedIn;
export const getName = state => state.auth.user.name;
