import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserReview from '../UserReview/UserReview.jsx';
import EnterpriseContact from '../EnterpriseContact/EnterpriseContact.jsx';

export default function Footer() {
    const [isUserReviewOpen, setUserReviewOpen] = useState(false);
    const [isEnterpriseContactOpen, setEnterpriseContactOpen] = useState(false);

    const handleEnterpriseContactButtonClick = () => {
        setEnterpriseContactOpen(true);
        setUserReviewOpen(false);
    };

    const handleReviewButtonClick = () => {
        setUserReviewOpen(true);
        setEnterpriseContactOpen(false);
    };

    return (
        <footer className="bg-white border-y mt-auto pt-1 pb-1">
            <div className="mx-auto w-full max-w-screen-xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tools Column */}
                    <div>
                        <h2 className="text-gray-900 font-semibold text-lg mb-4">Tools</h2>
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/find-doctor" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Find Doctor
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/find-clinic" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Find Clinic
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/book-appointment" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Book Appointment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Our Services
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* About Us Column */}
                    <div>
                        <h2 className="text-gray-900 font-semibold text-lg mb-4">About Us</h2>
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/about" className="text-gray-600 hover:text-orange-700 duration-200">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/news" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Latest News & Updates
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/terms" className="text-gray-600 hover:text-orange-700 duration-200">
                                    Terms and Conditions
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us Column */}
                    <div>
                        <h2 className="text-gray-900 font-semibold text-lg mb-4">Contact Us</h2>
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    to="/doctorFooter"
                                    className="text-gray-600 hover:text-orange-700 duration-200"
                                >
                                    Join as a Doctor
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleReviewButtonClick}
                                    className={`text-gray-600 hover:text-orange-700 duration-200 ${
                                        isUserReviewOpen ? 'text-orange-700' : ''
                                    }`}
                                >
                                    User Review/Doubt
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleEnterpriseContactButtonClick}
                                    className={`text-gray-600 hover:text-orange-700 duration-200 ${
                                        isEnterpriseContactOpen ? 'text-orange-700' : ''
                                    }`}
                                >
                                    Join us as Enterprise
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />
                
                {/* Social Media and Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p></p>
                    <p className="text-gray-500 text-center">© Paediprime 2024. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="https://www.linkedin.com/company/paediprime/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit LinkedIn"
                            className="text-gray-700 hover:text-blue-700 duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#0077b5"
                                className="w-6 h-6"
                            >
                                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.52c-1.14 0-1.87-.75-1.87-1.69 0-.95.74-1.69 1.9-1.69s1.87.75 1.87 1.69c0 .94-.73 1.69-1.9 1.69zM20.45 20.45h-3.56v-5.87c0-1.48-.53-2.5-1.87-2.5-1.02 0-1.63.69-1.9 1.35-.1.24-.12.58-.12.91v6.11H9.43s.05-9.92 0-10.95h3.56v1.55c.48-.74 1.34-1.8 3.27-1.8 2.39 0 4.19 1.56 4.19 4.89v6.31z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Modals */}
                {isUserReviewOpen && <UserReview onClose={() => setUserReviewOpen(false)} />}
                {isEnterpriseContactOpen && <EnterpriseContact onClose={() => setEnterpriseContactOpen(false)} />}
            </div>
        </footer>
    );
}