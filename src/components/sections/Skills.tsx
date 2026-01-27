import { RootState } from "@/src/redux/store";
import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

type SkillCategory = "all" | "frontend" | "backend" | "cloud" | "tools" | "programming" | "fullstack";

const Skills: React.FC = () => {
  const [filter, setFilter] = useState<SkillCategory>("all");
  // --- NEW: State for expansion ---
  const [isExpanded, setIsExpanded] = useState(false);

  const skills = useSelector((state: RootState) => state.skills);

  const filteredSkills = useMemo(() => {
    let result =
      filter === "all"
        ? [...skills]
        : skills.filter((s) => s.category === filter);

    return result.sort(
      (a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)
    );
  }, [skills, filter]);

  const categories: { id: SkillCategory; label: string }[] = [
    { id: "all", label: "All Skills" },
    { id: "programming", label: "Programming Languages" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "tools", label: "Tools" },
  ];

  // --- LOGIC: Calculate visible skills ---
  // If expanded, show all. If collapsed, show top 8 (2 rows of 4).
  // If a filter is active (not 'all'), usually better to just show all of that category, 
  // but we can apply the limit there too if you have tons of backend skills.
  const visibleSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 8);
  const hasHiddenSkills = filteredSkills.length > 8;

  return (
    <section id="skills" className="py-24 px-6 bg-background-dark/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Expertise
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive overview of my development stack, from frontend
            frameworks to cloud infrastructure.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setIsExpanded(false); // Reset expansion when changing category
              }}
              className={`relative px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer border ${
                filter === cat.id
                  ? "text-white border-primary"
                  : "bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {filter === cat.id && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(13,185,242,0.3)]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {filteredSkills.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <h3 className="text-slate-500">No skill found in this category</h3>
                <button
                  className="font-bold text-primary hover:underline cursor-pointer"
                  onClick={() => setFilter("all")}
                >
                  Clear Filter
                </button>
              </motion.div>
            ) : (
              // Use a fragment or div to wrap grid + button
              <div className="flex flex-col items-center">
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
                >
                  <AnimatePresence>
                    {visibleSkills.map((skill) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          key={skill._id}
                          className="glass-card rounded-xl p-5 flex flex-col items-start gap-4 transition-all duration-300 hover:scale-105 hover:border-primary/40 group cursor-pointer"
                        >
                          <div className={`p-3 rounded-lg bg-white/5 ${skill.colorClass} group-hover:bg-primary/20 transition-colors`}>
                            <Icon icon={`${skill.icon}`} className="text-3xl" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-lg ${skill.colorClass} brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300`}>
                              {skill.name}
                            </h3>
                            <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                              {skill.level}
                            </p>
                          </div>
                        </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* --- SHOW MORE BUTTON --- */}
                {hasHiddenSkills && (
                    <motion.button
                        layout
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-12 group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer px-6 py-3 rounded-full border border-white/5 hover:border-primary/30 bg-white/5 hover:bg-white/10"
                    >
                        <span>{isExpanded ? "Show Less" : `Show All ${filteredSkills.length} Skills`}</span>
                        <motion.span 
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="material-symbols-outlined"
                        >
                            keyboard_arrow_down
                        </motion.span>
                    </motion.button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;