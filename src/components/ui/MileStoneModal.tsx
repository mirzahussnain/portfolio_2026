import { addItem, updateEducation, updateExperience } from "@/src/firebase/services";
import {
  addNewEducation,
  updateEducationDetails,
} from "@/src/redux/features/EducationSlice";
import {
  addNewExperience,
  updateExperienceDetails,
} from "@/src/redux/features/ExperienceSlice";
import { Education, Experience } from "@/src/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneToEdit: Experience | Education | null;
  initialTab?: "experience" | "education";
}

interface MileStoneFormData {
  role: string;
  company: string;
  starting_date: string;
  ending_date: string;
  description: string;
  skills?: string;
  grade?: string;
  major?: string;
  type?: string;
}

const MileStoneModal = ({
  isOpen,
  onClose,
  milestoneToEdit,
  initialTab = "experience",
}: MilestoneModalProps) => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    initialTab
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [mileStoneId, setMileStoneId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<MileStoneFormData>({
    role: "", // or degree
    company: "", // or institution
    starting_date: "",
    ending_date: "",
    description: "", // or responsibilities
    skills: "", // Comma separated string for input

    grade: "",
    major: "",
    type: "",
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      const isExperience = activeTab === "experience";
      const collectionName = isExperience ? "experiences" : "qualifications";

      // Prepare payload for Firebase/Redux
      const payload: any = {
        starting_date: formData.starting_date,
        ending_date: formData.ending_date,
      };

      if (isExperience) {
        payload.role = formData.role;
        payload.company = formData.company;
        payload.responsibilities = formData.description;
        payload.skills = formData?.skills
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s !== "");
      } else {
        payload.title = formData.role; // mapping form 'role' input to 'degree'
        payload.institution = formData.company; // mapping form 'company' input to 'institution'
        payload.description = formData.description;
        (payload.grade = formData.grade),
          (payload.major = formData.major),
          (payload.type = formData.type);
      }

      let response;
      if (milestoneToEdit) {
      

        // Update Redux
        if (isExperience) {
          response=await updateExperience(payload,mileStoneId)
          if(response && response.success){
            dispatch(updateExperienceDetails({ ...payload, _id: mileStoneId }));
          }
          else{
            throw new Error(`Something went wrong ${response?.message}`)
          }
        } else {
           response=await updateEducation(payload,mileStoneId)
            if(response && response.success){

              dispatch(updateEducationDetails({ ...payload, _id: mileStoneId }));
            }else{
                throw new Error(`Something went wrong ${response?.message}`)
            }
        }
        toast.success("Milestone updated successfully!");
      } else {
        // ADD MODE

        response = await addItem(collectionName, payload);
        if (response) {
          const newId = response.id;
          // Update Redux
          if (isExperience) {
            dispatch(addNewExperience({ ...payload, _id: newId }));
          } else {
            dispatch(addNewEducation({ ...payload, _id: newId }));
          }
          toast.success("Milestone added successfully!");
        }
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    } finally {
      formData.company="",
      formData.description="",
      formData.ending_date="",
      formData.starting_date="",
      formData.description="",
      formData.grade="",
      formData.major="",
      formData.skills="",
      formData.type="",
      setLoading(false);
    }
  };


    // Reset or Populate Form on Open
  useEffect(() => {
    if (isOpen) {
      if (milestoneToEdit) {
        // Determine type based on properties (Experience has 'role', Education has 'degree')
        const isExp = "role" in milestoneToEdit;
        setActiveTab(isExp ? "experience" : "education");
        setMileStoneId(milestoneToEdit._id);
        setFormData({
          // Common fields mapping
          starting_date: milestoneToEdit.starting_date,
          ending_date: milestoneToEdit.ending_date,

          // Conditional mapping
          role: isExp
            ? (milestoneToEdit as Experience).role
            : (milestoneToEdit as Education).title,
          company: isExp
            ? (milestoneToEdit as Experience).company
            : (milestoneToEdit as Education).institution,
          description: isExp
            ? (milestoneToEdit as Experience).responsibilities
            : (milestoneToEdit as Education).description,
          skills: isExp ? milestoneToEdit.skills.join(", ") : "",
          grade: !isExp ? milestoneToEdit.grade : "",
          type: !isExp ? milestoneToEdit.type : "",
          major: !isExp ? milestoneToEdit.major : "",
        });
      } else {
        // Reset for Add New
        setActiveTab(initialTab);
        setFormData({
          role: "",
          company: "",
          starting_date: "",
          ending_date: "",
          description: "",
          skills: "",

          major: "",
          type: "",
          grade: "",
        });
      }
    }
  }, [isOpen, milestoneToEdit, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {milestoneToEdit ? "Edit Milestone" : "Add New Milestone"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* TABS - Only show if adding new (or you can allow switching type during edit, but generally better to lock it) */}
        {!milestoneToEdit && (
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("experience")}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === "experience"
                  ? "text-primary"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Experience
              {activeTab === "experience" && (
                <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === "education"
                  ? "text-primary"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Education
              {activeTab === "education" && (
                <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
              )}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                {activeTab === "experience"
                  ? "Role / Job Title"
                  : "Degree / Certificate"}
              </label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder={
                  activeTab === "experience"
                    ? "e.g. Senior Developer"
                    : "e.g. BSc Computer Science"
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                {activeTab === "experience"
                  ? "Company"
                  : "Institution / University"}
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder={
                  activeTab === "experience" ? "e.g. Google" : "e.g. MIT"
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Start Date
              </label>
              <input
                name="starting_date"
                type="date"
                required
                value={
                  formData.starting_date
                    ? // Safety check: only format if it's a valid date string
                      new Date(formData.starting_date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleChange}
                // [color-scheme:dark] makes the calendar popup dark mode!
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                End Date
              </label>
              <input
                name="ending_date"
                type="date"
                required
                value={
                  formData.ending_date
                    ? new Date(formData.ending_date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none [color-scheme:dark]"
                placeholder="e.g. Present"
              />
            </div>
          </div>

          {activeTab === "experience" ? (
            <div className="grid grid-cols-1  gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Skills (comma separated)
                </label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Major
                </label>
                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                  placeholder="Software Engineer, Pyschology, Art"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Grade
                </label>
                <input
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                  placeholder="A+, Distinction"
                />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">
                    Qualification Type
                  </label>
                  <input
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              {activeTab === "experience" ? "Responsibilities" : "Description"}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none resize-none"
              placeholder="Describe your role or studies..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && (
                <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {milestoneToEdit ? "Save Changes" : "Add Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MileStoneModal;
