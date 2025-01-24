import React from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";





const Footer = () => {
    return (
        <footer className="bg-[#000000] text-gray-300 animate__animated animate__fadeInUp pb-6 cinzel-font">
            <div className='text-center p-5 border-b-2 border-gray-600'>
                <h2 className='text-4xl font-semibold'>Traventure</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Contact Us Section */}
                <div className="bg-[#1F2937] p-10 flex justify-start sm:justify-center">
                    <div>
                        <h2 className="text-xl font-bold mb-4">CONTACT US</h2>
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>+88 123456789</p>
                        <p>Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>

                {/* Follow Us Section */}
                <div className="flex justify-start sm:justify-center p-10 bg-[#111827]">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Follow US</h2>
                        <p>Join us on social media</p>
                        <div className="flex justify-start space-x-4 mt-3">
                            {/* github  */}
                            <Link
                                to="#"
                                onClick={() => window.open('https://github.com/Jaber-riyan', '_blank', 'noopener,noreferrer')}>
                                <FaGithub size={30} />
                            </Link>

                            {/* facebook  */}
                            <Link
                                to="#"
                                onClick={() => window.open('https://web.facebook.com/jaberriyanyan', '_blank', 'noopener,noreferrer')}>
                                <FaFacebook size={30} />
                            </Link>

                            {/* instagram  */}
                            <Link
                                to="#"
                                onClick={() => window.open('https://www.instagram.com/jaber_._riyan', '_blank', 'noopener,noreferrer')}>
                                <FaInstagram size={30} />
                            </Link>

                            {/* linkedin  */}
                            <Link
                                to="#"
                                onClick={() => window.open('https://www.linkedin.com/in/jaber-ahmed-riyan', '_blank', 'noopener,noreferrer')}>
                                <FaLinkedin size={30} /
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 pt-4 text-center">
                <p className="text-sm">
                    Copyright ©{new Date().getFullYear()} CulinaryCloud. All rights reserved.
                </p>
            </div>

        </footer >
    );
};

export default Footer;
