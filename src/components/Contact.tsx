"use client";

import {useRef} from "react";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {FaEnvelope, FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";

interface SocialLink {
    name: string;
    icon: React.ReactNode;
    url: string;
}

const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        icon: <FaGithub size={24}/>,
        url: "https://github.com/erayucar",
    },
    {
        name: "Twitter",
        icon: <FaTwitter size={24}/>,
        url: "https://twitter.com/kefeyro",
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedin size={24}/>,
        url: "https://linkedin.com/in/hasanerayucar",
    },
    {
        name: "Email",
        icon: <FaEnvelope size={24}/>,
        url: "mailto:mail@erayucar.com",
    },
];

interface GlowingCardProps {
    children: React.ReactNode;
}

const GlowingCard = ({children}: GlowingCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (window.innerWidth < 768 || !cardRef.current) return;

        const {left, top} = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const gradientX = useTransform(mouseX, [0, 300], [0, 300]);
    const gradientY = useTransform(mouseY, [0, 300], [0, 300]);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-black/90 p-6 sm:p-8 rounded-2xl shadow-2xl border border-purple-500/10 overflow-hidden group"
            whileHover={{boxShadow: "0 0 30px 5px rgba(128, 90, 213, 0.2)"}}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-xl"
                    style={{
                        background: `radial-gradient(circle at ${gradientX}px ${gradientY}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
                    }}
                />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

const Contact = () => {
    return (
        <section id="contact"
                 className="min-h-screen py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-20 -left-20 w-72 h-72 bg-purple-700/10 rounded-full filter blur-3xl"></div>
                <div
                    className="absolute bottom-10 right-10 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold inline-block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">Contact
                        Me</h2>
                    <motion.div
                        className="h-0.5 sm:h-1 w-0 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"
                        animate={{width: "100px"}}
                        transition={{duration: 1, delay: 0.3}}
                    />
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                        Feel free to reach out if you have any questions or want to work together.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        viewport={{once: true}}
                        className="flex flex-col gap-6"
                    >
                        <GlowingCard>
                            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect
                                With Me</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-white mb-2">Social Profiles</h4>
                                    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                                        {socialLinks.map((link) => (
                                            <motion.a
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-purple-900/30 transition-all border border-purple-500/10"
                                                whileHover={{scale: 1.1, y: -3}}
                                                whileTap={{scale: 0.95}}
                                                aria-label={link.name}
                                            >
                                                {link.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-white mb-3">Location</h4>
                                        <p className="text-gray-300">Adana, Turkey</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium text-white mb-3">Email</h4>
                                        <a href="mailto:mail@erayucar.com"
                                           className="text-purple-400 hover:text-purple-300 transition-colors">
                                            mail@erayucar.com
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <motion.a
                                        href="/cv.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-lg text-white font-medium"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        <span>Download Resume</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </GlowingCard>

                        <GlowingCard>
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white">Let&apos;s Work Together</h3>
                                <p className="text-gray-300">
                                    Currently available for freelance work and open to discussing new opportunities.
                                    I specialize in building interactive web experiences with modern frameworks and 3D technologies.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-3">
                                    <span className="px-3 py-1.5 bg-purple-900/30 rounded-full text-xs sm:text-sm border border-purple-500/20 text-purple-300">
                                        Web Development
                                    </span>
                                    <span className="px-3 py-1.5 bg-purple-900/30 rounded-full text-xs sm:text-sm border border-purple-500/20 text-purple-300">
                                        3D Interfaces
                                    </span>
                                    <span className="px-3 py-1.5 bg-purple-900/30 rounded-full text-xs sm:text-sm border border-purple-500/20 text-purple-300">
                                        Blockchain
                                    </span>
                                </div>
                            </div>
                        </GlowingCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;