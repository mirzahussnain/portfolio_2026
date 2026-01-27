import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { LazyImage } from "../components/ui/LazyImage"; // Ensure path is correct
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { getYear, stringToDate } from "@/src/lib/utils";

const AllProjects = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // --- IMPROVED: Filter Tabs Logic ---
  const allStacks = useMemo(() => {
    // 1. Define the Priority Tags you ALWAYS want to show if they exist
    const PRIORITY_TAGS = ["All", "Full Stack", "DevOps", "UI/UX", "Next.js", "React"];
    
    // 2. Collect all unique tags from your projects
    const dynamicTags = new Set<string>();
    projects.forEach(p => p.stack.forEach(s => dynamicTags.add(s)));

    // 3. Filter: Keep Priority Tags + top used dynamic tags, removing duplicates
    const finalTabs = [...PRIORITY_TAGS].filter(tag => 
      tag === "All" || dynamicTags.has(tag) // Only show priority tags if you actually have a project with them
    );

    // 4. (Optional) Add other popular tags if you want more tabs, up to a limit
    // Array.from(dynamicTags).forEach(tag => {
    //    if (!finalTabs.includes(tag) && finalTabs.length < 8) finalTabs.push(tag);
    // });

    return finalTabs;
  }, [projects]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              // Allow searching by stack text too (e.g. typing "firebase")
                              project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTab = activeFilter === "All" || project.stack.includes(activeFilter);
        return matchesSearch && matchesTab;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-background-dark pt-24 pb-20 px-6 animate-in fade-in duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-4 text-sm font-bold uppercase tracking-wider transition-colors">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">
              Project <span className="text-primary">Archive</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl">
              A complete collection of my development work, open source contributions, and design experiments.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search (e.g. Redis, Dashboard)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          </div>
        </div>

        {/* Filter Scrollbar */}
        <div className="flex gap-2 overflow-x-auto pb-4 pt-4 scrollbar-hide">
          {allStacks.map((stack) => (
            <button
              key={stack}
              onClick={() => setActiveFilter(stack)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                activeFilter === stack 
                  ? "bg-primary text-background-dark border-primary" 
                  : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {stack}
            </button>
          ))}
        </div>
      </div>

      {/* --- PROJECTS GRID --- */}
      <div className="max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={project._id}
                className="group relative bg-white/5 border border-white/5 hover:border-primary/30 rounded-xl overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Minimal Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <LazyImage 
                    src={project.url.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                     <a 
                        href={project.url.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="size-8 rounded-full bg-primary text-background-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        title="Live Demo"
                     >
                        <span className="material-symbols-outlined text-lg">arrow_outward</span>
                     </a>
                     <a 
                        href={project.url.code} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        title="View Code"
                     >
                        <span className="material-symbols-outlined text-lg">code</span>
                     </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                    <span className="text-[10px] font-mono text-slate-500 border border-white/10 px-1.5 py-0.5 rounded">
                        {getYear(stringToDate(project.date))}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {/* HIDE THE CATEGORY TAGS IN THE CHIPS TO REDUCE CLUTTER */}
                    {project.stack
                        .filter(tech => !["DevOps", "Full Stack", "UI/UX"].includes(tech)) // Optional: Hide categories from chips
                        .slice(0, 3)
                        .map(tech => (
                        <span key={tech} className="text-[10px] uppercase font-bold text-slate-500 bg-black/20 px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                    {project.stack.length > 3 && (
                        <span className="text-[10px] uppercase font-bold text-slate-600 px-1 py-1">
                            +more
                        </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/5">
                <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">search_off</span>
                <p className="text-slate-400">No projects match your search.</p>
                <button onClick={() => {setSearchQuery(""); setActiveFilter("All")}} className="text-primary text-sm font-bold mt-2 hover:underline">
                    Reset filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;