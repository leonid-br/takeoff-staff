import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { register } from '../../redux/auth/auth-operations';
import style from './RegisterForm.module.css';

const RegisterForm = () => {
    const dispatch = useDispatch();

    const initialState = { name: null, password: null, email: null };
    const [userData, setUserData] = useState(initialState);

    const handleChange = e => {
        setUserData(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        try {
            dispatch(register(userData));
            console.log(userData);
            setUserData(initialState);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.segment}>
                <h2>Registration</h2>
            </div>
            <label className={style.label}>
                Name
                <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    placeholder="Ivanov Ivan"
                    className={style.input}
                />
            </label>

            <label className={style.label}>
                E-mail
                <input
                    type="text"
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder="ivanov@me.com"
                    className={style.input}
                />
            </label>

            <label className={style.label}>
                Password
                <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    placeholder="Password"
                    className={style.input}
                />
            </label>
            <button type="submit" className={style.red}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
