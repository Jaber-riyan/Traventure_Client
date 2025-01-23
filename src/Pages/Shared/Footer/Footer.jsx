import React from 'react';
import 'animate.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 animate__animated animate__fadeInUp pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
                    {/* Contact Us Section */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-semibold mb-4">CONTACT US</h2>
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>+88 123456789</p>
                        <p>Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>

                    {/* Follow Us Section */}
                    <div className="text-center sm:text-right">
                        <h2 className="text-xl font-semibold mb-4">Follow US</h2>
                        <p>Join us on social media</p>
                        <div className="flex justify-center sm:justify-end space-x-4">
                            <a href="#" aria-label="Facebook">
                                <i className="fab fa-facebook-f text-2xl hover:text-white"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="fab fa-instagram text-2xl hover:text-white"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fab fa-twitter text-2xl hover:text-white"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm">
                        Copyright ©{new Date().getFullYear()} CulinaryCloud. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
