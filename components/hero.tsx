"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAnimationControls } from "@/hooks/useAnimationControls";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [controls, ref] = useAnimationControls();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Floating shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-white rounded-full opacity-10"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center mb-4"
      >
        <Image src="/logo/chatfolio.svg" alt="ChatFolio" width={100} height={100} />
        <h1
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
          }}
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200"
        >
          ChatFolio
        </h1>
      </motion.div>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-lg md:text-2xl text-white mb-8 text-center"
      >
        Your AI Conversations, Beautifully Organized
      </motion.p>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Link href="/chatfolio.zip" download>
          <Button size="lg" variant="white-glossy">
            Download Extension
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
