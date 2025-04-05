"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltCard = ({ children }: { children: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Spring physics for smooth movement
    const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 });
    
    // Transform values
    const rotateX = useTransform(ySpring, [-100, 100], [10, -10]);
    const rotateY = useTransform(xSpring, [-100, 100], [-10, 10]);
    const scale = useSpring(isHovered ? 1.05 : 1, { stiffness: 200, damping: 20 });
    
    const handleMouseMove = (e: React.MouseEvent) => {
        // Only enable tilt effect on larger screens
        if (window.innerWidth < 768 || !cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        x.set(mouseX);
        y.set(mouseY);
    };
    
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };
    
    return (
        <motion.div
            ref={cardRef}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
                scale
            }}
            className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-purple-600/20"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-50" 
                style={{ transform: "translateZ(-10px)" }} />
            
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(145,94,255,0.15),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                    style={{ transform: `translate(${x.get() / 5}px, ${y.get() / 5}px)` }} />
            </div>
            
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const About = () => {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-24 text-white bg-gradient-to-b from-black/80 via-purple-950/10 to-black/80 relative">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-purple-700/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-blue-700/10 rounded-full blur-3xl"></div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 md:mb-12 relative"
            >
                <h2 className="text-3xl sm:text-4xl font-bold inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">About Me</h2>
                <motion.div
                    className="h-0.5 sm:h-1 w-0 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto"
                    animate={{ width: "120px" }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-3xl"
            >
                <TiltCard>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I&apos;m <span className="text-purple-400 font-medium">Eray Uçar</span>, a
                            <strong className="text-white"> Fullstack Blockchain Developer</strong> focused on Web3. I develop modern applications 
                            using technologies such as Next.js, NestJS, Solidity, and Rust.
                        </p>
                        
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            I&apos;m also passionate about <span className="text-cyan-400 font-medium">3D and interactive interfaces</span>. 
                            I enjoy using Three.js and WebGL technologies to make user experiences special and impressive.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                            {["React", "Next.js", "Three.js", "Node.js", "Solidity", "Web3"].map((tech) => (
                                <span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-900/30 rounded-full text-xs sm:text-sm border border-purple-500/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </motion.div>
        </section>
    );
};

export default About;