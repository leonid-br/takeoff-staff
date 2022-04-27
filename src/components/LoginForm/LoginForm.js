import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { login } from '../../redux/auth/auth-operations';
import style from './LoginForm.module.css';
import { useHistory } from 'react-router';

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = { email: null, password: null };
    const [userData, setUserData] = useState(initialState);

    const handleChange = e => {
        setUserData(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        try {
            dispatch(login(userData));
            history.push('/contacts');
            setUserData(initialState);
        } catch (error) {}
    };
    return (
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.segment}>
                    <h2>Sign up</h2>
                </div>
                <label className={style.label}>
                    <input
                        type="text"
                        name="email"
                        required
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={style.input}
                    />
                </label>

                <label className={style.label}>
                    <input
                        type="text"
                        name="password"
                        required
                        onChange={handleChange}
                        placeholder="Password"
                        className={style.input}
                    />
                </label>
                <button type="submit" className={style.red}>
                    Log in
                </button>
            </form>
        </>
    );
};

export default LoginForm;
