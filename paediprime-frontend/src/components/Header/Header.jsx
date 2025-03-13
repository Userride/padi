import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "./image/logo2.png";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideNavbar = location.pathname === '/loginuser' || location.pathname === '/createuser' || location.pathname === '/logindoctor' || location.pathname === '/Immunisation';

    const [isOpen, setIsOpen] = useState(false);
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('patientName');
        if (name) {
            setPatientName(name);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove the authentication token from local storage
        localStorage.removeItem("patientName");
        setPatientName('');
        navigate("/loginuser");
    };

    if (hideNavbar) {
        return null;
    }

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-2xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            className="mr-3 ml-3 h-16"
                            alt="Logo"
                        />
                    </Link>

                    {/* Hamburger Menu for Mobile */}
                    <div className="lg:hidden">
                        <button className="text-gray-700 hover:text-blue-700 focus:outline-none" onClick={toggleMenu}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:flex-row lg:items-center" id="desktop-menu">
                        <ul className="flex flex-row space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-bleu-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Team"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Team
                                </NavLink>
                            </li>
                        </ul>

                        {!localStorage.getItem("authToken") ? (
                            <div className="flex items-center ml-4">
                                <Link
                                    to="/loginuser"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/createuser"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none"
                                >
                                    Sign up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center ml-8"> {/* Added margin-left here */}
                                <span className="text-gray-700 mr-4">Welcome, {patientName}</span>
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 focus:outline-none" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block py-2 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} hover:bg-gray-50 hover:text-blue-700`
                                }
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `block py-2 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} hover:bg-gray-50 hover:text-blue-700`
                                }
                                onClick={toggleMenu}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `block py-2 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} hover:bg-gray-50 hover:text-blue-700`
                                }
                                onClick={toggleMenu}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Team"
                                className={({ isActive }) =>
                                    `block py-2 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} hover:bg-gray-50 hover:text-blue-700`
                                }
                                onClick={toggleMenu}
                            >
                                Team
                            </NavLink>
                        </li>
                    </ul>
                    {!localStorage.getItem("authToken") ? (
                        <div className="mt-4">
                            <Link
                                to="/loginuser"
                                className="block text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                                onClick={toggleMenu}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/createuser"
                                className="block mt-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                                onClick={toggleMenu}
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <button className="block text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none" onClick={() => { handleLogout(); toggleMenu(); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
