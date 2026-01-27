import { LazyImage } from "../ui/LazyImage";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom"; 

const TABS = ["All", "UI/UX", "Next.js", "Full Stack", "DevOps"];

const Projects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // 1. Sort Newest First
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 2. Filter by Tab
    if (activeTab !== "All") {
      filtered = filtered.filter(
        (p) => p.stack?.includes(activeTab) || p.stack?.some(s => s.includes(activeTab))
      );
    }
    
    // 3. STRICT LIMIT TO 3
    return filtered.slice(0, 3);
  }, [projects, activeTab]);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
             A glimpse into my technical experiments and applications.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab ? "text-white" : "text-slate-400 hover:text-white bg-white/5"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* --- GRID OR EMPTY STATE --- */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project._id}
                className="glass-card group cursor-pointer relative flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 bg-white/5"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden shrink-0">
                  <LazyImage
                    src={project.url.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent opacity-60"></div>
                  {project.version && (
                      <div className="absolute top-3 right-3 z-20">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/10">
                          {project.version}
                      </span>
                      </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="material-symbols-outlined text-slate-500 text-[20px]">
                      {project.icon || "code"}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.stack.slice(0, 6).map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a href={project.url.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold rounded-lg transition-colors group/btn">
                      Live Demo
                      <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-0.5">arrow_outward</span>
                    </a>
                    <a href={project.url.code} target="_blank" rel="noreferrer" className="size-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                      <span className="material-symbols-outlined text-[18px]">code</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // --- EMPTY STATE ADDED BACK ---
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">folder_off</span>
            <p className="text-slate-500 mb-2">
              No projects found for <span className="text-white font-bold">"{activeTab}"</span>.
            </p>
            <button
              onClick={() => setActiveTab("All")}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* View All Button (Only show if we have projects overall) */}
        {projects.length > 3 && (
            <div className="mt-16 text-center">
                <Link to="/projects">
                    <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                    <span>View Full Portfolio</span>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                    </span>
                    </button>
                </Link>
            </div>
        )}
      </div>
    </section>
  );
};

export default Projects;