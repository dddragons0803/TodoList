import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/actions'; // Import the logout action

const Nav = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    // Dispatch the logout action when the button is clicked
    const handleLogout = () => {
        dispatch(logout());
    };

    // Only show nav when logged in
    if (!user) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav navbar-top navbar-top-header">
                <div>
                    <NavLink to="/" className="home-link nav-item nav-link">Home</NavLink>
                </div>
                <div>
                    <button onClick={handleLogout} className="btn btn-link nav-item nav-link nav-logout-button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
