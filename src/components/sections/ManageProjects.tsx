import { RootState } from "@/src/redux/store";
import { Project } from "@/src/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyImage } from "../ui/LazyImage";
import ProjectModal from "../ui/ProjectModal";
import { deleteItem } from "@/src/firebase/services";
import { deleteProject } from "@/src/redux/features/ProjectSlice";
import { toast } from "sonner";

const ManageProjects = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this number as needed

  // --- CALCULATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddProjectClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await deleteItem("projects", id);
      if (res.success) {
        dispatch(deleteProject(id));
        toast.success(res.message);

        // Adjust page if we deleted the last item on the current page
        if (currentProjects.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      } else {
        toast.error(res.message);
      }
    }
  };

  const closeModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Portfolio Management
          </h3>
          <p className="text-slate-400 text-sm">
            Add, edit, or remove projects from the public gallery.
          </p>
        </div>
        <button
          onClick={() => handleAddProjectClick()}
          className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <span className="max-sm:hidden material-symbols-outlined text-sm">add_circle</span>
          <p className="max-sm:hidden">New Project</p>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Project Details</th>
                <th className="px-6 py-4 font-bold">Tech Stack</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentProjects.length > 0 ? (
                currentProjects.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                          <LazyImage
                            src={p.url.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {p.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 max-w-50 truncate">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {p.stack.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20 uppercase font-black"
                          >
                            {t}
                          </span>
                        ))}
                        {p.stack.length > 2 && (
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 border border-white/10 uppercase font-bold">
                            +{p.stack.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${
                            p.url.demo ? "bg-emerald-500" : "bg-slate-500"
                          }`}
                        ></span>
                        <span className="text-xs font-bold text-slate-300">
                          {p.url.demo ? "Live" : "In Progress"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity scroll-smooth">
                        <button
                          className="text-slate-400 hover:text-primary p-2 transition-colors"
                          onClick={() => handleEditClick(p)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p._id)}
                          className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No projects found. Add a new project to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION CONTROLS --- */}
        {projects.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            <span className="text-sm text-slate-400">
              Showing{" "}
              <span className="text-white font-bold">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="text-white font-bold">
                {Math.min(indexOfLastItem, projects.length)}
              </span>{" "}
              of <span className="text-white font-bold">{projects.length}</span>{" "}
              entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={editingProject || null}
        mode={editingProject ? "editing" : "creation"}
      />
    </div>
  );
};

export default ManageProjects;