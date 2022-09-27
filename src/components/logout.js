import PropTypes from 'prop-types';
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Logout({ setToken }) {
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
        navigate("/");
    }, []);

    return null;
}

Logout.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Logout;
