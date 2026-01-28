import { deleteItem } from "@/src/firebase/services";
import { deleteSkill } from "@/src/redux/features/SkillSlice";
import { RootState } from "@/src/redux/store";
import { Skill } from "@/src/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkillModal from "../ui/SkillsModal";
import { toast } from "sonner";

const ManageSkills = () => {
  const skills = useSelector((state: RootState) => state.skills);
  const dispatch = useDispatch();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this number

  // --- CALCULATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSkills = skills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(skills.length / itemsPerPage);

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleAddSkillClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteSkill = async (id: string) => {
    // Check if confirming deletion
    // Use window.confirm or a custom modal for better UX, standard confirm blocks execution
    if (window.confirm("Are you sure you want to delete this skill?")) {
        // Optimistic UI update or wait for response? Here waiting.
      const res = await deleteItem("skills", id);
      if (res.success) {
        dispatch(deleteSkill(id));
        toast.success(res.message);
        
        // Adjust page if we deleted the last item on the current page
        if (currentSkills.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
      } else {
        toast.error(res.message);
      }
    }
  };

  const closeModal = () => {
    setEditingSkill(null);
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
          <h3 className="text-2xl font-bold text-white">Skills Management</h3>
          <p className="text-slate-400 text-sm">
            Add, edit, or remove skills from the public gallery.
          </p>
        </div>
        <button
          onClick={() => handleAddSkillClick()}
          className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          
          <p className="max-sm:hidden">New Skill</p>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Project Details</th>
                <th className="px-6 py-4 font-bold">Tech Stack</th>
                <th className="px-6 py-4 font-bold">Level</th>
                <th className="px-6 py-4 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {/* RENDER CURRENT SKILLS ONLY */}
              {currentSkills.length > 0 ? (
                currentSkills.map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-bold text-white">
                            {s.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {s.category.split("|").map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary border border-primary/20 uppercase font-black"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">
                          {s.level.replace(
                            s.level.charAt(0),
                            s.level.charAt(0).toLocaleUpperCase()
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity scroll-smooth">
                        <button
                          className="text-slate-400 hover:text-primary p-2 transition-colors"
                          onClick={() => handleEditClick(s)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(s._id)}
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
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No skills found. Add a new skill to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION CONTROLS --- */}
        {skills.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            <span className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-white font-bold">
                {Math.min(indexOfLastItem, skills.length)}
              </span>{" "}
              of <span className="text-white font-bold">{skills.length}</span> entries
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

      <SkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        skill={editingSkill || null}
        mode={editingSkill ? "editing" : "creation"}
      />
    </div>
  );
};

export default ManageSkills;