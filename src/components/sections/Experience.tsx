
import React from 'react';
import { INITIAL_EXPERIENCE } from '../../lib/constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 relative bg-background-dark overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3  max-sm:items-center">
            <div className="flex items-center gap-2 mb-2 ">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">Resume</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1] max-sm:text-center">
              Experience & <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Education</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mt-2 max-sm:text-center">
              My professional journey through software engineering, highlighting key roles, academic achievements, and the technologies I've mastered.
            </p>
          </div>
          <button className="group flex items-center justify-center gap-3 glass-card hover:bg-white/10 text-white py-3 px-6 rounded-xl transition-all font-semibold">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">download</span>
            <span>Download CV</span>
          </button>
        </div>

        <div className="relative pl-4 md:pl-0">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -ml-px hidden md:block"></div>
          <div className="absolute left-6 top-2 bottom-0 w-0.5 bg-white/10 md:hidden"></div>

          <div className="flex flex-col gap-12">
            {INITIAL_EXPERIENCE.map((item, index) => (
              <div key={item.id} className={`relative grid md:grid-cols-2 gap-8 items-center`}>
                <div className={`${index % 2 === 0 ? 'md:text-right order-2 md:order-1 pl-12 md:pl-0' : 'order-2 pl-12 md:pl-0 md:col-start-2'}`}>
                  <div className="glass-card p-6 rounded-2xl relative transition-all duration-300 hover:border-primary/40 group">
                    <div className="flex flex-col gap-4">
                      <div className={`flex justify-between items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                          <p className="text-primary font-medium">{item.company}</p>
                        </div>
                        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded h-fit">{item.period}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      <div className={`flex flex-wrap gap-2 mt-1 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background-dark border-4 border-white/10 flex items-center justify-center z-20 order-1 shadow-[0_0_15px_rgba(13,185,242,0.5)]">
                  <span className="material-symbols-outlined text-primary text-sm">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
