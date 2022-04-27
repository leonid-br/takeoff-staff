import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactItem from 'components/ContactItem/ContactItem';
import style from './ContactList.module.css';
import { getAllContacts, isLoggedInGet } from 'redux/selectors';
import { getContacts } from 'redux/phonebook/phonebook-operation';

const ContactList = () => {
    const dispatch = useDispatch();

    const getUserContacts = (items, filter) => {
        const normalizedFilter = filter.toLowerCase();

        const findContacts = items.filter(item =>
            item.name.toLowerCase().includes(normalizedFilter),
        );

        if (findContacts.length === 0) {
            // alert(`No contact ${normalizedFilter.toUpperCase()}`);
        }
        return findContacts;
    };

    const { items, filter } = useSelector(getAllContacts);
    const isLoggedIn = useSelector(isLoggedInGet);
    const contacts = getUserContacts(items, filter);

    useEffect(() => {
        if (isLoggedIn) dispatch(getContacts());
    }, [dispatch, isLoggedIn]);

    return (
        <>
            {isLoggedIn && items.length > 0 && (
                <>
                    <h2 className={style.heading}>Contacts</h2>
                    <ul className={style.list}>
                        {contacts.map(el => (
                            <ContactItem
                                key={el.id}
                                name={el.name}
                                number={el.number}
                                id={el.id}
                            />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

ContactItem.porpTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
};
export default ContactList;
