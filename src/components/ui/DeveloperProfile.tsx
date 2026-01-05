import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TechBackground from "./TechBackground"; // Make sure this path is correct
import { About, Skill } from "@/src/types";

const DeveloperProfile = ({
  about,
  skills,
}: {
  about: About;
  skills: Skill[];
}) => {
  const randomSkills = useMemo(() => {
    return [...skills].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [skills]);
  return (
    // 1. OUTER CONTAINER: Added 'p-12 md:p-24' to create space for the floating background
    <div className="relative flex items-center justify-center p-6 md:p-24 overflow-hidden rounded-2xl">
      {/* 2. THE BACKGROUND: Sits absolute behind everything */}
      <div className="absolute inset-0 z-0">
        <TechBackground />
      </div>

      {/* 3. OPTIONAL GLOW: Your existing blur effect (kept it, but moved z-index up slightly) */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* 4. THE CARD: Added 'relative z-10' to ensure it sits ON TOP of the background */}
      <div className="relative z-10 w-full max-w-lg glass-card rounded-2xl p-6 md:p-8 overflow-hidden group border border-white/10 shadow-2xl">
        {/* Window Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <span className="text-blue-400">⚡</span> developer_profile.tsx
          </div>
        </div>

        {/* Code Block */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="w-full mx-auto bg-[#0d1117]/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all"
          >
            <div className="px-6 py-2 overflow-x-auto custom-scrollbar">
              <div className="font-mono text-sm md:text-[15px] leading-relaxed whitespace-pre">
                {/* Object Implementation */}
                <div>
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-blue-300">
                    {about.name.split(" ")[0].toLocaleLowerCase()}
                  </span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-yellow-300">Developer</span>{" "}
                  <span className="text-pink-400">=</span>{" "}
                  <span className="text-slate-300">{"{"}</span>
                </div>

                <div>
                  <div>
                    <span className="text-blue-300"> name</span>:
                    <span className="text-green-400"> {about.name}</span>,
                  </div>
                  <div className="flex flex-wrap">
                    <span className="text-blue-300"> skills</span>: [
                    {randomSkills.map((skill, index) => (
                      <span className="text-green-400" key={index}>
                        {skill.name}
                        {index < randomSkills.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    ],
                  </div>
                  <div>
                    <span className="text-blue-300"> hardWorker</span>:
                    <span className="text-red-400"> true</span>,
                  </div>
                  <div>
                    <span className="text-blue-300"> problemSolver</span>:
                    <span className="text-red-400"> true</span>,
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300"> hireable</span>:
                    <span className="text-purple-400"> function</span>() {"{"}
                  </div>
                  <div>
                    <span className="text-pink-400"> return</span>
                    <span className="text-green-400">
                      {" "}
                      "Available for work!"
                    </span>
                    ;
                  </div>
                  <div> {"}"}</div>
                </div>
                <div className="text-slate-300">{"}"};</div>

                {/* Blinking Cursor */}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-blue-400 mt-1 inline-block align-middle ml-1"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Badge */}
        <div className="absolute -right-4 -bottom-4 bg-primary text-background-dark p-4 rounded-xl shadow-lg transform rotate-12 transition-transform duration-300 group-hover:rotate-6">
          <span className="material-symbols-outlined text-[32px] text-white">
            verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
