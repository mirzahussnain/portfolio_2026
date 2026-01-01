import React, { useState } from "react";
import { LazyImage } from "../ui/LazyImage";
import { AnimatePresence, motion } from "framer-motion";
import { PROFESSION_TITLES } from "@/src/lib/constants";
import DeveloperProfile from "../ui/DeveloperProfile";

const sentenceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.12, // Typing speed
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05, // Backspace speed (faster)
      staggerDirection: -1, // This reverses the order (backspace effect)
    },
  },
};
const letterVariants = {
  initial: { opacity: 0, width: 0 }, // Start hidden with 0 width
  animate: { opacity: 1, width: "auto" }, // Expand to natural width
  exit: { opacity: 0, width: 0 }, // Shrink back to 0 width
};

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleAnimationComplete = () => {
    // Wait 2 seconds after typing finishes, then switch index to trigger 'exit'
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % PROFESSION_TITLES.length);
    }, 2000);
  };
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6"
    >
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-medium font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Available for hire
          </div>
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-medium text-slate-400">
              Hello, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              <span className="text-white">Hussnain </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                Ali
              </span>
            </h1>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                terminal
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={index} // Changing the key triggers the Unmount (Exit) and Mount (Enter)
                  variants={sentenceVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onAnimationComplete={(definition) => {
                    // Only trigger the pause when the "animate" (typing) phase is done
                    if (definition === "animate") {
                      handleAnimationComplete();
                    }
                  }}
                  className="whitespace-nowrap" // Prevents layout shift
                >
                  {PROFESSION_TITLES[index].split("").map((char, i) => (
                    <motion.span
                      key={`${char}-${i}`}
                      variants={letterVariants}
                      className="inline-block" // Required for transform/opacity animations
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
              {/* Blinking Cursor */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block w-0.75 h-7 bg-blue-500 align-middle"
              />
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              I specialize in building scalable, modern web applications with
              clean code and intuitive design. Transforming complex problems
              into elegant, user-centric solutions.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <a
              href="#projects"
              className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              View Projects
              <span className="material-symbols-outlined text-[18px]">
                visibility
              </span>
            </a>
            <a
              href="#contact"
              className="h-12 px-8 rounded-lg glass-card hover:bg-white/5 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all border border-white/10"
            >
              Contact Me
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
            </a>
          </div>
        </div>

        <DeveloperProfile/>

        
      </div>
    </section>
  );
};

export default Hero;
