import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Container from './Container';
import Heading from './Heading';
import Notification from './Notification';
import WelcomePage from './WelcomePage';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getContacts } from '../redux/phonebook/phonebook-operation';
import { getItems, isLoggedInGet, getName } from '../redux/selectors';
import { fetchCurrentUser } from '../redux/auth/auth-operations';
import { Routes, useNavigate } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getItems);
    const name = useSelector(getName);
    const isLoggedIn = useSelector(isLoggedInGet);
    const navigate = useNavigate();

    navigate('/');
    useEffect(() => {
        // dispatch(fetchCurrentUser());
        // dispatch(getContacts());
    }, [dispatch, isLoggedIn]);

    return (
        <Container>
            {!isLoggedIn ? (
                <Routes>
                    <PublicRoute path="/" exact>
                        <WelcomePage />
                    </PublicRoute>

                    <PublicRoute path="/register" restricted>
                        <RegisterForm />
                    </PublicRoute>

                    <PublicRoute path="/login" restricted>
                        <LoginForm />
                    </PublicRoute>

                    {/* <PrivateRoute path="/contacts" /> */}
                </Routes>
            ) : (
                <>
                    <PrivateRoute path="/contacts">
                        <Heading
                            title={`Your phonebook, ${name.toUpperCase()}`}
                        />
                        <ContactForm />

                        {contacts.length >= 2 && <Filter />}
                        {contacts.length > 0 ? (
                            <ContactList />
                        ) : (
                            <Notification />
                        )}
                    </PrivateRoute>
                </>
            )}
        </Container>
    );
};

export default App;
