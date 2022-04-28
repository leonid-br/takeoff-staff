import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/phonebook/phonebook-operation';
import style from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { getItems } from '../../redux/selectors';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', number: '' });
    const dispatch = useDispatch();
    const contacts = useSelector(getItems);

    const handelChange = e => {
        const { name, value } = e.target;

        setFormData(state => ({ ...state, [name]: value }));
    };

    const changeEnterName = name => {
        const normalizeName = name.toLowerCase();

        return contacts.find(
            ({ name }) => normalizeName === name.toLowerCase(),
        );
    };

    const handelSubmit = e => {
        e.preventDefault();

        if (changeEnterName(formData.name)) {
            return alert(
                `This contact "${formData.name.toUpperCase()}" has already been added to your Phonebook`,
            );
        }

        dispatch(addContact(formData));

        setFormData({ name: '', number: '' });
    };

    return (
        <form onSubmit={handelSubmit} className={style.form}>
            <label className={style.lable}>
                Name
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handelChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                    className={style.input}
                    placeholder="Ivan Ivanov"
                />
            </label>

            <label className={style.lable}>
                Number
                <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handelChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                    className={style.input}
                    placeholder="+7-999-99-99"
                />
            </label>

            <button type="submit" className={style.button}>
                Add contact
            </button>
        </form>
    );
};
ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    handelChange: PropTypes.func,
    handelSubmit: PropTypes.func,
};

export default ContactForm;
