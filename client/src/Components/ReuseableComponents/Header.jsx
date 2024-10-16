import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Crud App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/showData' className="nav-link">Show Data</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>


        </>
    )
}

export default Header