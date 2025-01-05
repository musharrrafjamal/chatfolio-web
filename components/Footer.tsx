"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-end gap-2">
            <motion.div
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-300"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ChatFolio
            </motion.div>
            <Image
              src="/logo/chatfolio.svg"
              alt="ChatFolio"
              width={50}
              height={50}
            />
          </div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="https://github.com/musharrrafjamal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-all duration-300"
            >
              <Image
                src="/icons/github.svg"
                alt="Github"
                unoptimized
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://x.com/musharrafJamal8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-all duration-300"
            >
              <Image 
                src="/icons/twitterX.svg" 
                alt="X" 
                width={32} 
                height={32}
                unoptimized
              />
            </a>
          </motion.div>

          <motion.div
            className="text-xl text-center text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Organize your AI conversations beautifully
          </motion.div>

          <motion.div
            className="flex items-center text-gray-100 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Made with <Heart className="w-4 h-4 mx-1 text-pink-500" /> by
            <Link
              href="https://musharraf-39357.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-200 transition-colors duration-300 ml-1 hover:underline"
            >
              Musharraf Jamal
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Glowing effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-20 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
