"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ThreeBG from "@/components/ThreeBG";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <main className="relative overflow-hidden">
            <AnimatePresence mode="wait">
                {loading ? (
                    <LoadingScreen 
                        key="loading-screen"
                        finishLoading={() => setLoading(false)}
                    />
                ) : null}
            </AnimatePresence>
            <ThreeBG />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}