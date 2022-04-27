import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedInGet } from 'redux/selectors';
import { useHistory } from 'react-router';

export default function PrivateRaute({ children, ...routeProps }) {
    const isLoggedIn = useSelector(isLoggedInGet);
    const history = useHistory();

    if (isLoggedIn) {
        history.push('/contacts');
    }

    return (
        <Route {...routeProps}>
            {isLoggedIn ? children : <Redirect to="/" />}
        </Route>
    );
}
