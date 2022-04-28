import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContactById } from '../../redux/phonebook/phonebook-operation';
import style from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
    const dispatch = useDispatch();

    return (
        <li key={id} className={style.item}>
            <span>{name}</span>:<span className={style.number}>{number}</span>
            <button
                type="button"
                onClick={() => dispatch(deleteContactById(id))}
                className={style.button}
            >
                Delete
            </button>
        </li>
    );
};

ContactItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default ContactItem;
