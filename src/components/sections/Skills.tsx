
import React, { useState } from 'react';
import { INITIAL_SKILLS } from '../../lib/constants';

const Skills: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'tools'>('all');

  const filteredSkills = filter === 'all' 
    ? INITIAL_SKILLS 
    : INITIAL_SKILLS.filter(s => s.category === filter);

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'tools', label: 'Tools' },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-background-dark/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Expertise</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive overview of my development stack, from frontend frameworks to cloud infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all backdrop-blur-sm border ${
                filter === cat.id 
                  ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(13,185,242,0.3)]' 
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map(skill => (
            <div 
              key={skill.id} 
              className="glass-card rounded-xl p-5 flex flex-col items-start gap-4 transition-all duration-300 hover:scale-105 hover:border-primary/40 group"
            >
              <div className={`p-3 rounded-lg bg-white/5 ${skill.colorClass} group-hover:bg-primary/20 transition-colors`}>
                <span className="material-symbols-outlined text-3xl">{skill.icon}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{skill.name}</h3>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">{skill.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
