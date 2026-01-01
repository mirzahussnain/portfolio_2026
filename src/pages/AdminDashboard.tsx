
import React, { useState } from 'react';
import { Project, Experience } from '../types';
import { INITIAL_PROJECTS, INITIAL_EXPERIENCE } from '../lib/constants';
import { LazyImage } from '../components/ui/LazyImage';
import { useDispatch } from 'react-redux';
import { logout } from '@/src/redux/features/AuthSlice';


const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'resume'>('overview');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const dispatch=useDispatch();

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to remove this experience entry?')) {
      setExperiences(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Project Entry',
      description: 'A newly added project description for the portfolio.',
      imageUrl: `https://picsum.photos/seed/${Math.random()}/800/450`,
      tags: ['React', 'Simulated'],
      icon: 'star'
    };
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-background-dark/50 hidden lg:flex flex-col p-4">
        <div className="flex items-center gap-3 px-2 py-6">
          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-2 ring-primary/20">
            <span className="material-symbols-outlined text-2xl">shield_person</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Admin Portal</h1>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Developer Access</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          {[
            { id: 'overview', icon: 'dashboard', label: 'Overview' },
            { id: 'projects', icon: 'work', label: 'Manage Projects' },
            { id: 'resume', icon: 'article', label: 'Resume & Exp' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <p className="text-sm font-semibold">{item.label}</p>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <button 
           onClick={()=>dispatch(logout())}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Logout Session</p>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">System Dashboard</h2>
            <p className="text-slate-400 mt-1">Status: <span className="text-emerald-400 font-mono">CONNECTED_AND_SYNCED</span></p>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end mr-4">
                <p className="text-sm font-bold text-white">Hussnain Ali</p>
                <p className="text-xs text-slate-500">Super Admin</p>
             </div>
             <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400">person</span>
             </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border-l-4 border-primary">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">Portfolio Items</p>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">folder_open</span>
                </div>
                <p className="text-4xl font-black text-white">{projects.length}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Active & Visible</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">Profile Views</p>
                  <span className="material-symbols-outlined text-blue-400 bg-blue-400/10 p-2 rounded-lg">visibility</span>
                </div>
                <p className="text-4xl font-black text-white">1,284</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-blue-400">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>+12% this week</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">Form Inquiries</p>
                  <span className="material-symbols-outlined text-purple-400 bg-purple-400/10 p-2 rounded-lg">mail</span>
                </div>
                <p className="text-4xl font-black text-white">23</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span>Last inquiry 2h ago</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
               <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                       <div className="size-10 rounded bg-white/5 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">update</span>
                       </div>
                       <div>
                          <p className="text-sm text-white font-medium">System updated project metadata</p>
                          <p className="text-xs text-slate-500">Oct {20+i}, 2024 - 14:32</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">Portfolio Management</h3>
                <p className="text-slate-400 text-sm">Add, edit, or remove projects from the public gallery.</p>
              </div>
              <button 
                onClick={handleAddProject}
                className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                New Project
              </button>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Project Details</th>
                      <th className="px-6 py-4 font-bold">Category</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg overflow-hidden border border-white/10">
                              <LazyImage src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{p.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5 max-w-50 truncate">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap">
                            {p.tags.slice(0, 2).map(t => (
                              <span key={t} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20 uppercase font-black">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-bold text-slate-300">Live</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-slate-400 hover:text-primary p-2 transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                            <button 
                              onClick={() => handleDeleteProject(p.id)}
                              className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">Experience Timeline</h3>
                <p className="text-slate-400 text-sm">Manage work history and educational milestones.</p>
              </div>
              <div className="flex gap-3">
                <button className="glass-card text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10">
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  Replace CV PDF
                </button>
                <button className="bg-primary text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Milestone
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiences.map(e => (
                <div key={e.id} className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative group border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                        <span className="material-symbols-outlined text-2xl">{e.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{e.role}</h4>
                        <p className="text-primary text-sm font-bold">{e.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-slate-500 hover:text-primary p-1 transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button 
                        onClick={() => handleDeleteExperience(e.id)}
                        className="text-slate-500 hover:text-red-500 p-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{e.description}</p>
                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
                    <span className="text-slate-500 text-xs font-mono font-bold bg-white/5 px-2 py-1 rounded">{e.period}</span>
                    <div className="flex gap-1">
                       {e.tags.slice(0, 2).map(t => (
                         <span key={t} className="text-[9px] uppercase font-black text-slate-500 tracking-tighter">{t}</span>
                       ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
