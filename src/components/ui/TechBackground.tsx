import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const techStack = [
  // --- TOP AREA ---
  { name: "React", color: "text-blue-400", top: "0%", left: "5%" },
  { name: "Next.js", color: "text-white", top: "5%", left: "75%" },

  // --- BOTTOM AREA ---
  { name: "Tailwind", color: "text-cyan-400", top: "85%", left: "5%" },
  { name: "GraphQL", color: "text-pink-500", top: "80%", left: "70%" },

  // --- CORNERS & EDGES (Pushed further out to avoid the card) ---
  { name: "TypeScript", color: "text-blue-500", top: "25%", left: "85%" },
  { name: "Node.js", color: "text-green-500", top: "65%", left: "2%" },

  // --- BEHIND/CENTER (Subtle) ---
  { name: "Framer", color: "text-purple-400", top: "10%", left: "40%" },
];

const TechBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* 2. Floating Tech Names */}
      {techStack.map((tech, index) => {
        const duration = getRandom(15, 25);
        const yOffset = getRandom(10, 30); // Keep movement subtle so it stays visible
        const xOffset = getRandom(-10, 10);

        return (
          <motion.div
            key={index}
            className={`absolute font-bold text-xl md:text-3xl ${tech.color} opacity-40`}
            style={{
              top: tech.top,
              left: tech.left,
              textShadow: "0 0 20px currentColor", // Neon Glow Effect
            }}
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, -yOffset, 0],
              x: [0, xOffset, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.5,
            }}
          >
            {tech.name}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechBackground;
