
import React from 'react';
import { INITIAL_PROJECTS } from '../../lib/constants';
import { LazyImage } from '../ui/LazyImage';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            A showcase of technical experiments, full-stack applications, and design systems built with modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_PROJECTS.map((project) => (
            <article 
              key={project.id} 
              className="glass-card group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30"
            >
              <div className="relative aspect-video overflow-hidden">
                <LazyImage 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-background-dark/80 to-transparent opacity-60"></div>
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
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">{project.icon || 'code'}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 grow line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-300 border border-white/5 group-hover:text-primary group-hover:border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold rounded-lg transition-colors group/btn">
                    <span>Live Demo</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-0.5">arrow_outward</span>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-white hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined text-[20px]">code</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
            <span>View Full Portfolio</span>
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
