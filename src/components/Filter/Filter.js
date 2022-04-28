import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { findContact } from '../../redux/phonebook/phonebook-actions';
import style from './Filter.module.css';

const Filter = () => {
    const value = useSelector(state => state.contacts.filter);
    const dispatch = useDispatch();

    const handelChange = e => dispatch(findContact(e.target.value));

    return (
        <label className={style.label}>
            Find contacts by name
            <input
                placeholder="Search contact"
                type="text"
                value={value}
                onChange={handelChange}
                className={style.input}
            />
        </label>
    );
};

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default Filter;
