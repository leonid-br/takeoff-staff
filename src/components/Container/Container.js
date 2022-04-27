import PropTypes from 'prop-types';
import style from './Container.module.css';

const Container = ({ children }) => (
    <div className={style.container}>{children}</div>
);

Container.propTypes = {
    children: PropTypes.node,
};

export default Container;
