"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const titles = [
    "Fullstack Developer 💻",
    "Blockchain Specialist ⛓️",
    "Next.js Ninja ⚔️",
];

interface GlowingButtonProps {
    children: React.ReactNode;
    href: string;
}

const GlowingButton = ({ children, href }: GlowingButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        
        const rect = buttonRef.current.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
        
        // Update the CSS variable positions
        if (buttonRef.current) {
            buttonRef.current.style.setProperty('--mouse-x', `${mouseX.current}px`);
            buttonRef.current.style.setProperty('--mouse-y', `${mouseY.current}px`);
        }
    };
    
    return (
        <motion.a
            ref={buttonRef}
            href={href}
            className="relative mt-8 px-8 py-3 rounded-xl text-white font-semibold overflow-hidden cursor-pointer inline-flex items-center justify-center min-w-[180px]"
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%'
            } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Base gradient background */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundSize: "200% 200%"
                }}
            />
            
            {/* Interactive glow on hover */}
            <div 
                className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 100px)`
                }}
            />
            
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-2">
                {children}
                <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    →
                </motion.span>
            </div>
        </motion.a>
    );
};

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = titles[index];
        setText((prev) =>
            isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
        );

        if (!isDeleting && text === current) {
            setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && text === "") {
            setIsDeleting(false);
            setIndex((index + 1) % titles.length);
        }

        const speed = isDeleting ? 50 : 100;
        const timer = setTimeout(() => {}, speed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    const parallaxEffect = (e: React.MouseEvent) => {
        // Only apply parallax on desktop devices
        if (window.innerWidth < 768 || !containerRef.current) return;
        
        const container = containerRef.current;
        const { width, height } = container.getBoundingClientRect();
        const offsetX = (e.clientX - width / 2) / 25;
        const offsetY = (e.clientY - height / 2) / 25;
        
        container.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
    };

    return (
        <div 
            className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4 overflow-hidden py-20"
            onMouseMove={parallaxEffect}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            
            <div ref={containerRef} className="relative z-10 transition-transform duration-100 ease-out max-w-4xl">
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent
                             animate-gradient-x">
                            Hello, I&apos;m Eray Uçar
                        </span>
                    </h1>
                    
                    <motion.div
                        className="h-0.5 sm:h-1 w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto"
                        animate={{ width: "60%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                </motion.div>
                
                <motion.h2
                    className="text-lg sm:text-xl md:text-3xl mt-4 sm:mt-6 font-medium h-8 sm:h-10"
                    animate={{ opacity: [0, 1, 0.8, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    {text}
                    <span className="text-purple-400 animate-blink">|</span>
                </motion.h2>
                
                <GlowingButton href="#about">
                    Let&apos;s Get Started
                </GlowingButton>
            </div>
        </div>
    );
}