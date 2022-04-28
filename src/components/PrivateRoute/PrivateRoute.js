import { useSelector } from 'react-redux';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { isLoggedInGet } from '../../redux/selectors';

export default function PrivateRaute({ children, ...routeProps }) {
    const isLoggedIn = useSelector(isLoggedInGet);
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate('/contacts');
    }

    return (
        <Route {...routeProps}>
            {isLoggedIn ? children : <Navigate replace to="/" />}
        </Route>
    );
}
