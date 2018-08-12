import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <div className="navigation-container">
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" activeClassName="selected" to="/">Zadeshwar</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon fa fa-menu"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto"></ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <NavLink className="nav-link" activeClassName="selected" to="/">Home</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" activeClassName="selected" to="/gallery">Gallery</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" activeClassName="selected" to="/gallery">About us</NavLink>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    );
};

export default NavigationBar;