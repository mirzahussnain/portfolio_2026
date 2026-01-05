import { deleteItem } from "@/src/firebase/services";
import { deleteEducation } from "@/src/redux/features/EducationSlice";
import { deleteExperience } from "@/src/redux/features/ExperienceSlice";
import { RootState } from "@/src/redux/store";
import { Education, Experience } from "@/src/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MileStoneModal from "../ui/MileStoneModal";
import { getFullDate } from "@/src/lib/utils";

type mileStoneType= "education" | "experience";
const ManageResume = () => {
  const experiences = useSelector((state: RootState) => state.experiences);
  const education = useSelector((state: RootState) => state.educations);
  
  const dispatch = useDispatch();
  const [editingMilestone, setEditingMilestone] = useState<
    Experience | Education | null
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"experience" | "education">("experience");
  const handleEditClick = (item: Experience | Education,type:mileStoneType) => {
    setEditingMilestone(item);
    setModalTab(type);
    setIsModalOpen(true);
  };

  const handleAddMileStoneClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingMilestone(null);
    setIsModalOpen(false);
  };

  const handleDeleteMileStone = async (id: string,mileStone:mileStoneType) => {
    const isExperience=mileStone==='experience';
    if (confirm(`Are you sure you want to delete this ${isExperience?'experience':'education'} milestone?`)) {
      const res = await deleteItem(`${isExperience?'experiences':'qualifications'}`, id);
      if (res.success) {
        if(isExperience){
            dispatch(deleteExperience(id));
        }
        else{
            dispatch(deleteEducation(id));
        }
        alert(res.message);
      } else {
        alert(res.message);
      }
    }
  };

  const renderCard = (item: Experience | Education, type: mileStoneType) => {
    const isExp = type === 'experience';
    // Type assertion for easier access
    const role = isExp ? (item as Experience).role : (item as Education).title;
    const company = isExp ? (item as Experience).company : (item as Education).institution;
    const desc = isExp ? (item as Experience).responsibilities : (item as Education).description;

    return (
      <div
        key={item._id}
        className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative group border border-white/5 hover:border-primary/20 transition-all"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                {role}
              </h4>
              <p className="text-primary text-sm font-bold">{company}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
                onClick={() => handleEditClick(item, type)}
                className="text-slate-500 hover:text-primary p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <button
              onClick={() => handleDeleteMileStone(item._id, type)}
              className="text-slate-500 hover:text-red-500 p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {desc}
        </p>
        <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
          <span className="text-slate-500 text-xs font-mono font-bold bg-white/5 px-2 py-1 rounded">
           <span>
            
            </span> 
            {getFullDate( new Date(item.starting_date))} {"->"} {getFullDate( new Date(item.ending_date))}
          </span>
         {
            isExp &&(
                 <div className="flex gap-1">
            {(item as Experience).skills && (item as Experience).skills.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[9px] uppercase font-black text-slate-500 tracking-tighter"
              >
                {t}
              </span>
            ))}
          </div>
            )
         }
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex max-sm:flex-col justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Experience Timeline</h3>
          <p className="text-slate-400 text-sm">
            Manage work history and educational milestones.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="glass-card text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10">
            <span className="material-symbols-outlined text-sm">
              upload_file
            </span>
            Replace CV PDF
          </button>
          <button
            className="bg-primary text-background-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            onClick={() => handleAddMileStoneClick()}
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Milestone
          </button>
        </div>
      </div>

    
      {/* Experience Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-primary">work_history</span>
            Experience
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experiences.map((e) => renderCard(e, 'experience'))}
            {experiences.length === 0 && <p className="text-slate-500 text-sm italic">No experience added yet.</p>}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-primary">school</span>
            Education
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((e) => renderCard(e, 'education'))}
            {education.length === 0 && <p className="text-slate-500 text-sm italic">No education added yet.</p>}
        </div>
      </div>

      {/* Modal */}
      <MileStoneModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        milestoneToEdit={editingMilestone}
        initialTab={modalTab}
      />
    </div>
    
  );
};

export default ManageResume;
