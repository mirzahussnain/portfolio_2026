import { LazyImage } from "../ui/LazyImage";

import { useSelector } from "react-redux";

import { RootState } from "@/src/redux/store";

import { getYear, stringToDate } from "@/src/lib/utils";
import { useState, useMemo } from "react";
import { motion } from "motion/react";

const TABS = ["All", "React", "Next.js", "Full Stack"];

const Projects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (activeTab !== "All") {
      filtered = projects.filter(
        (p) => p.stack?.includes(activeTab) || p.stack?.includes(activeTab)
      );
    }
    return filtered.slice(0, 6);
  }, [projects, activeTab]);
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Selected{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              Projects
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            A showcase of technical experiments, full-stack applications, and
            design systems built with modern web technologies.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "text-white"
                  : "text-slate-400 hover:text-white bg-white/5"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project._id}
              className="glass-card group cursor-pointer relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
            >
              <div className="relative aspect-video overflow-hidden">
                <LazyImage
                  src={project.url.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-background-dark/80 to-transparent opacity-60 "></div>

                {project.version && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-md border border-white/10">
                      {project.version}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col grow p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <span className="text-xs font-bold text-white group-hover:bg-white group-hover:text-primary bg-primary transition-colors rounded-sm px-3">
                      {getYear(stringToDate(project.date))}
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-slate-500 text-[20px]">
                    {project.icon || "code"}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 grow overflow-hidden   text-wrap line-clamp-2 group-hover:line-clamp-none  max-h-[3rem] group-hover:overflow-visible group-hover:max-h-[10rem] ">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-300 border border-white/5 group-hover:text-primary group-hover:border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold rounded-lg transition-colors group/btn">
                    <a href={project.url.demo} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>

                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-0.5">
                      arrow_outward
                    </span>
                  </button>

                  <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                    <a
                      className="material-symbols-outlined text-[20px] cursor-pointer"
                      href={project.url.code}
                      target="_blank"
                      rel="noreferrer"
                    >
                      code
                    </a>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- Empty State --- */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">
              No projects found in this category.
            </p>
            <button
              onClick={() => setActiveTab("All")}
              className="text-primary font-bold mt-2 hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="mt-16 text-center">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
              <span>View Full Portfolio</span>

              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
