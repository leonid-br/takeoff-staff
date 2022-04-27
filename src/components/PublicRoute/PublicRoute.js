import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedInGet } from 'redux/selectors';

export default function PublicRoute({
    children,
    restricted = false,
    ...routeProps
}) {
    const isLoggedIn = useSelector(isLoggedInGet);
    const shouldRedirect = isLoggedIn && restricted;

    return (
        <Route {...routeProps}>
            {shouldRedirect ? <Redirect to="/contacts" /> : children}
        </Route>
    );
}
