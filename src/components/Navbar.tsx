"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.85]);
    const blurAmount = useTransform(scrollY, [0, 100], [8, 16]);
    const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Disable scrolling when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const links = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 w-full z-50 shadow-lg px-4 md:px-6 py-4 md:py-5 flex justify-between items-center"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                backgroundColor: `rgba(13, 12, 34, ${bgOpacity})`,
                backdropFilter: `blur(${blurAmount}px)`,
                borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
                boxShadow: scrolled
                    ? "0 8px 32px 0 rgba(31, 38, 135, 0.15)"
                    : "none"
            }}
        >
            <motion.a
                href="#"
                className="text-white font-bold text-xl md:text-2xl relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Eray.dev
                </span>
                <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500"
                    animate={{ width: scrolled ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 text-white font-medium">
                {links.map((link) => (
                    <li key={link.name}>
                        <motion.a
                            href={link.href}
                            className="hover:text-purple-400 transition relative py-1 px-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {link.name}
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500"
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.a>
                    </li>
                ))}
                <li>
                    <motion.a
                        href="/Eray_Ucar_CV.pdf"
                        download
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md group-hover:blur-xl transition-all duration-300 opacity-70"></span>
                        <span className="relative px-5 py-2.5 rounded-xl bg-black bg-opacity-50 text-white font-semibold text-sm flex items-center justify-center">
                            Download CV
                        </span>
                    </motion.a>
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                    className="text-white focus:outline-none"
                >
                    <div className="w-8 flex flex-col justify-center items-center">
                        <span
                            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
                        ></span>
                        <span
                            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                        ></span>
                        <span
                            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
                        ></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg flex flex-col items-center z-50 rounded-b-2xl border-t border-purple-900/50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="flex flex-col w-full text-white">
                            {links.map((link) => (
                                <li key={link.name} className="w-full">
                                    <motion.a
                                        href={link.href}
                                        className="text-center hover:bg-purple-900/30 block w-full py-4 font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                            <li className="py-4 flex justify-center w-full">
                                <motion.a
                                    href="/cv.pdf"
                                    download
                                    className="relative group w-40"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md group-hover:blur-xl transition-all duration-300 opacity-70"></span>
                                    <span className="relative px-5 py-2.5 rounded-xl bg-black bg-opacity-50 text-white font-semibold text-sm flex items-center justify-center">
                                        Download CV
                                    </span>
                                </motion.a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;