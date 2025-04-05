"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen = ({ finishLoading }: LoadingScreenProps) => {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => finishLoading(), 3400);
    return () => clearTimeout(timer);
  }, [finishLoading]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevCounter + 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const hexagonVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      scale: 0,
      y: -10,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Logo */}
        <div className="relative mb-8">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={hexagonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-1"
              >
                <svg
                  width="20"
                  height="25"
                  viewBox="0 0 20 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="10,0 20,6.5 20,18.5 10,25 0,18.5 0,6.5"
                    fill={i % 2 === 0 ? "#8b5cf6" : "#ec4899"}
                    className="opacity-80"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 md:w-80 bg-gray-900 h-1.5 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${counter}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 text-sm font-mono"
        >
          Loading {counter}%
        </motion.div>
        
        {/* Developer Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 text-center"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Eray Uçar
          </div>
          <div className="text-gray-500 text-sm">
            Fullstack Developer
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 