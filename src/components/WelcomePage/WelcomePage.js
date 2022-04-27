import { Link } from 'react-router-dom';
import style from './WelcomePage.module.css';

const WelcomePage = () => {
    return (
        <>
            <h2 className={style.heading}>Contacts App</h2>
            <p className={style.p}>Hello Friend!</p>
            <p className={style.p}>
                If you have an account click here
                <Link to="/login" className={style.a}>
                    Login
                </Link>
            </p>
            <p className={style.p}>
                If you don't have an account click here
                <Link to="/register" className={style.a}>
                    Register
                </Link>
            </p>
        </>
    );
};

export default WelcomePage;
