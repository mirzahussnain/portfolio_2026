import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/redux/features/AuthSlice";
import { VscClose } from "react-icons/vsc";
import { MdOutlineMenu } from "react-icons/md";
import { RootState } from "../redux/store";
import { useViewCount } from "../lib/hooks";

import ManageProjects from "../components/sections/ManageProjects";
import ManageSkills from "../components/sections/ManageSkills";
import ManageResume from "../components/sections/ManageResume";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  

  
  // const experiences = useSelector((state: RootState) => state.experiences);

  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { views, weekly, trend, loading } = useViewCount(true);
  const projects = useSelector((state: RootState) => state.projects);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "skills" | "resume"
  >("overview");

  const dispatch = useDispatch();
  
 

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white relative">
      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-72 border-r border-white/5 bg-background-dark md:bg-background-dark/70 absolute md:static lg:flex left-0 top-0  flex-col p-4 z-50 h-full transition-transform ease-in-out duration-700`}
      >
        <div className="flex items-center gap-3 px-2 py-6">
          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-2 ring-primary/20">
            <span className="material-symbols-outlined text-2xl">
              shield_person
            </span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Admin Portal</h1>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
              Developer Access
            </p>
          </div>
          <button
            className={`inline md:hidden ml-auto`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <VscClose size={28} />
          </button>
        </div>

        <nav className={"flex flex-col gap-2 mt-4"}>
          {[
            { id: "overview", icon: "dashboard", label: "Overview" },
            { id: "projects", icon: "work", label: "Manage Projects" },
            { id: "skills", icon: "psychology_alt", label: "Manage Skills" },
            { id: "resume", icon: "article", label: "Resume & Exp" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <p className="text-sm font-semibold">{item.label}</p>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            onClick={() => dispatch(logout())}
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
          <button
            className="inline md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MdOutlineMenu size={28} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              System Dashboard
            </h2>
            <p className="text-slate-400 mt-1">
              Status:{" "}
              <span className="text-emerald-400 font-mono">
                CONNECTED_AND_SYNCED
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-4">
              <p className="text-sm font-bold text-white">Hussnain Ali</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">
                person
              </span>
            </div>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border-l-4 border-primary">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">
                    Portfolio Items
                  </p>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
                    folder_open
                  </span>
                </div>
                <p className="text-4xl font-black text-white">
                  {projects.filter((p) => p.url.demo != null).length}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  <span>Active & Visible</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">
                    Profile Views
                  </p>
                  <span className="material-symbols-outlined text-blue-400 bg-blue-400/10 p-2 rounded-lg">
                    visibility
                  </span>
                </div>
                <p className="text-4xl font-black text-white">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    views.toLocaleString()
                  )}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs ">
                  <div className="flex w-full justify-between">
                    <p className="text-xs text-slate-500 mt-2">
                      +{weekly} new this week
                    </p>

                    <div
                      className={`flex gap-1 items-center ${
                        trend > 0
                          ? "text-blue-400"
                          : trend == 0
                          ? "text-slate-500"
                          : "text-red-400"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] `}
                      >
                        {trend > 0
                          ? "trending_up"
                          : trend < 0
                          ? "trending_down"
                          : trend == 0 && "trending_flat"}
                      </span>
                      <span>
                        {trend >= 0 ? "+" : "-"}
                        {trend}% this week
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-400 text-sm font-medium">
                    Form Inquiries
                  </p>
                  <span className="material-symbols-outlined text-purple-400 bg-purple-400/10 p-2 rounded-lg">
                    mail
                  </span>
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
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="size-10 rounded bg-white/5 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">update</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        System updated project metadata
                      </p>
                      <p className="text-xs text-slate-500">
                        Oct {20 + i}, 2024 - 14:32
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && <ManageProjects />}
        {activeTab === "skills" && <ManageSkills />}

        {activeTab === "resume" && <ManageResume />}
      </main>
    </div>
  );
};

export default AdminDashboard;
