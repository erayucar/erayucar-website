"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaReact, FaNodeJs, FaEthereum, FaRust } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { SiPython, SiApachekafka, SiSnowflake } from "react-icons/si";

interface Skill {
    name: string;
    icon: React.ReactNode;
    description: string;
}

const skills: Skill[] = [
    { 
        name: "React", 
        icon: <FaReact className="text-cyan-400" size={40} />,
        description: "I use React.js to build modern UIs"
    },
    { 
        name: "Next.js", 
        icon: <TbBrandNextjs className="text-white" size={40} />,
        description: "Next.js is my choice for high-performance websites"
    },
    { 
        name: "NestJS", 
        icon: <FaNodeJs className="text-red-500" size={40} />,
        description: "I use NestJS for backend APIs"
    },
    { 
        name: "Solidity", 
        icon: <FaEthereum className="text-purple-400" size={40} />,
        description: "I develop smart contracts"
    },
    { 
        name: "Rust", 
        icon: <FaRust className="text-orange-400" size={40} />,
        description: "I use Rust for Web3 applications"
    },
    { 
        name: "Python", 
        icon: <SiPython className="text-blue-400" size={40} />,
        description: "I use Python for backend and data tasks"
    },
    { 
        name: "Kafka", 
        icon: <SiApachekafka className="text-white" size={40} />,
        description: "I use Kafka for event-driven architectures"
    },
    { 
        name: "Snowflake", 
        icon: <SiSnowflake className="text-cyan-300" size={40} />,
        description: "I use Snowflake for data warehousing"
    },
];

interface SkillCardProps {
    skill: Skill;
    index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Create values for rotation animation
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Transform values based on mouse position
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    
    const handleMouseMove = (e: React.MouseEvent) => {
        // Only enable 3D effect on larger screens
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
    };
    
    return (
        <motion.div
            ref={cardRef}
            className="relative h-44 sm:h-52 md:h-56 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-black/90 rounded-2xl border border-purple-500/10 p-4 sm:p-6 flex flex-col items-center justify-center shadow-xl"
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-col items-center">
                    <motion.div 
                        animate={{ 
                            y: [0, -10, 0],
                        }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: index * 0.2
                        }}
                        className="mb-3 sm:mb-4"
                    >
                        {skill.icon}
                    </motion.div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">{skill.name}</h3>
                    
                    <p className="text-gray-400 text-xs sm:text-sm text-center">
                        {skill.description}
                    </p>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-lg transition duration-1000 group-hover:duration-200" />
            </motion.div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900 text-white text-center px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-60 sm:w-80 h-60 sm:h-80 bg-purple-700/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-700/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold inline-block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">Skills</h2>
                    <motion.div
                        className="h-0.5 sm:h-1 w-0 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"
                        animate={{ width: "100px" }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-10 sm:mt-16"
                >
                    <p className="text-base sm:text-lg text-gray-300 max-w-lg mx-auto">
                        I continuously learn new technologies and keep improving myself.
                        By following modern development practices, I aim to deliver the best user experience.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;