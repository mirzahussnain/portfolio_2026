import { deleteItem } from "@/src/firebase/services";
import { deleteSkill } from "@/src/redux/features/SkillSlice";
import { RootState } from "@/src/redux/store";
import { Skill } from "@/src/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkillModal from "../ui/SkillsModal";


const ManageSkills = () => {
 const skills = useSelector((state: RootState) => state.skills);
  const dispatch=useDispatch();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleAddSkillClick=()=>{
    setIsModalOpen(true);
  }

    const handleDeleteSkill =async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
        const res=await deleteItem('skills',id)
        if(res.success){
            dispatch(deleteSkill(id));
            alert(res.message);
        }
        else{
            alert(res.message);
        }
    }
  };

  const closeModal = () => {
    setEditingSkill(null);
    setIsModalOpen(false);
  };

    

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Skills Management
          </h3>
          <p className="text-slate-400 text-sm">
            Add, edit, or remove skills from the public gallery.
          </p>
        </div>
        <button
          onClick={()=>handleAddSkillClick()}
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
                <th className="px-6 py-4 font-bold">Tech Stack</th>
                <th className="px-6 py-4 font-bold">Level</th>
                <th className="px-6 py-4 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skills.map((s) => (
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
                      {s.category.split('|').map((t) => (
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
                      {/* <span className="size-2 rounded-full bg-emerald-500"></span> */}
                      <span className="text-xs font-bold text-slate-300">
                        {s.level.replace(s.level.charAt(0),s.level.charAt(0).toLocaleUpperCase())}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* 4. RENDER MODAL (Outside the main loop) */}
            <SkillModal
              isOpen={isModalOpen}
              onClose={closeModal}
              skill={editingSkill || null}
              mode={editingSkill?'editing':'creation'}
            />
    </div>
  );
}

export default ManageSkills