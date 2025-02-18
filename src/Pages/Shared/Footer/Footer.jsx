import React from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-gray-300 animate__animated animate__fadeInUp py-10 shadow-2xl">
            {/* Logo & Title */}
            <div className='text-center pb-5 border-b border-t pt-5 border-gray-700'>
                <h2 className='text-4xl font-bold text-white tracking-widest uppercase bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                    Traventure
                </h2>
            </div>

            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 lg:px-16 py-10">
                
                {/* Contact Us Section */}
                <div className="flex justify-start md:justify-center bg-gray-800 dark:bg-gray-950 p-8 rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">📍 CONTACT US</h2>
                        <p className="text-gray-400">123 ABS Street, Uni 21, Bangladesh</p>
                        <p className="text-gray-400">📞 +88 123456789</p>
                        <p className="text-gray-400">🕒 Mon - Fri: 08:00 - 22:00</p>
                        <p className="text-gray-400">🕒 Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>

                {/* Follow Us Section */}
                <div className="flex justify-start md:justify-center bg-gray-800 dark:bg-gray-950 p-8 rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">📢 Follow Us</h2>
                        <p className="text-gray-400">Join us on social media</p>
                        <div className="flex space-x-5 mt-4">
                            {/* GitHub */}
                            <Link to="#" onClick={() => window.open('https://github.com/Jaber-riyan', '_blank')}>
                                <FaGithub className="text-white hover:text-gray-400 transition-all duration-300 scale-105 hover:scale-110" size={30} />
                            </Link>

                            {/* Facebook */}
                            <Link to="#" onClick={() => window.open('https://web.facebook.com/jaberriyanyan', '_blank')}>
                                <FaFacebook className="text-blue-500 hover:text-blue-400 transition-all duration-300 scale-105 hover:scale-110" size={30} />
                            </Link>

                            {/* Instagram */}
                            <Link to="#" onClick={() => window.open('https://www.instagram.com/jaber_._riyan', '_blank')}>
                                <FaInstagram className="text-pink-500 hover:text-pink-400 transition-all duration-300 scale-105 hover:scale-110" size={30} />
                            </Link>

                            {/* LinkedIn */}
                            <Link to="#" onClick={() => window.open('https://www.linkedin.com/in/jaber-ahmed-riyan', '_blank')}>
                                <FaLinkedin className="text-blue-600 hover:text-blue-500 transition-all duration-300 scale-105 hover:scale-110" size={30} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 pt-4 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Traventure. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
