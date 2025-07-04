"use client";

import { motion } from "framer-motion";
import { FaBolt, FaProjectDiagram, FaStar } from "react-icons/fa";

const About = () => {
    const coreSkills = [
        {
            title: "AI Agent",
            description: "Built real‑time Twitter scoring bot (Python + Node). Rule filter → ONNX‑optimised LLM (OpenAI/Claude) → USDT reward trigger.",
        },
        {
            title: "Data Pipeline",
            description: "Kafka → Snowflake (sub‑2s latency). Redis cache, micro‑batch ETL.",
        },
        {
            title: "Smart Contracts",
            description: "Solidity (Hardhat/Truffle) on Ethereum & Tron.",
        },
        {
            title: "Backend",
            description: "Nest.js, Express, AWS Lambda, Serverless Framework.",
        },
        {
            title: "Frontend",
            description: "React, Next.js, TypeScript, Tailwind, Three.js.",
        },
        {
            title: "DevOps",
            description: "Docker, GitLab CI/CD, Bitbucket Pipelines, Terraform.",
        },
    ];

    const keyTechs = ["React", "Next.js", "Node", "Nest", "Python", "Kafka", "Redis", "Snowflake", "Solidity", "ONNX", "OpenAI/Claude", "AWS", "Docker"];
    
    const achievements = [
        {
            icon: <FaBolt className="text-yellow-400" />,
            text: "30k msg/min tweet pipeline, latency < 250 ms."
        },
        {
            icon: <FaProjectDiagram className="text-green-400" />,
            text: "Encrypted OAuth flow, GDPR purge < 60 s."
        },
        {
            icon: <FaStar className="text-blue-400" />,
            text: "MEV bot/anomaly detection module (Kafka Streams)."
        }
    ];

    return (
        <section id="about" className="py-20 sm:py-24 text-white bg-gradient-to-b from-black via-gray-900/50 to-black px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        Core Skills & Responsibilities
                    </h2>
                    <p className="text-gray-400">A snapshot of my technical expertise.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {coreSkills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/50 transition-colors duration-300"
                        >
                            <h3 className="font-bold text-lg text-white mb-2">{skill.title}</h3>
                            <p className="text-gray-400 text-sm">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Key Technologies</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {keyTechs.map(tech => (
                            <span key={tech} className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-700">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Highlighted Achievements</h3>
                    <div className="space-y-4 max-w-lg mx-auto">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 bg-gray-900/50 border border-purple-500/20 rounded-lg p-4"
                            >
                                <div className="text-2xl">{achievement.icon}</div>
                                <p className="text-gray-300">{achievement.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;