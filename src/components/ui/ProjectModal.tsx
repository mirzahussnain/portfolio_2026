import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { Project } from "@/src/types";
import { uploadToCloudinary } from "@/src/lib/utils";
import { addItem, updateProject } from "@/src/firebase/services";

import { useDispatch } from "react-redux";
import {
  addNewProject,
  updateProjectDetail,
} from "@/src/redux/features/ProjectSlice";
import { toast } from "sonner";
// Remove Timestamp import if not used
// import { Timestamp } from "firebase/firestore";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  mode: "editing" | "creation";
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  mode,
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [projectID, setProjectID] = useState<string | null>(null);
  
  // New state for checkboxes
  const [isDevOps, setIsDevOps] = useState(false);
  const [isUIUX, setIsUIUX] = useState(false);
  const [isFullstack, setIsFullstack] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: {
      image: "",
      image_public_id: "",
      code: "",
      demo: "",
    },
    date: "",
    stack: "",
    version: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = { ...formData };
      
      // 1. CHECK: Did the user select a NEW file?
      if (newImageFile) {
        const uploadData = await uploadToCloudinary(newImageFile,"portfolio-2026/projects","image");

        payload = {
          ...payload,
          url: {
            ...payload.url,
            image: uploadData.url,
            image_public_id: uploadData.publicId,
          },
        };
      }

      // --- Calculate the stack string including checkboxes ---
      let stackString = payload.stack;
      
      const hasTag = (tag: string) => stackString.toLowerCase().split(',').map(s => s.trim()).includes(tag.toLowerCase());

      if (isDevOps && !hasTag("DevOps")) {
        stackString = stackString ? `${stackString}, DevOps` : "DevOps";
      }
      if (isUIUX && !hasTag("UI/UX")) {
         stackString = stackString ? `${stackString}, UI/UX` : "UI/UX";
      }
      if(isFullstack && !hasTag("Full Stack")) {
         stackString = stackString ? `${stackString}, Full Stack` : "Full Stack";
      }

      // 2. Prepare Payload for Database (Expects stack as STRING)
      const dbPayload = {
        ...payload,
        stack: stackString, 
      };

      // Prepare Payload for Redux (Expects stack as ARRAY)
      const formattedStack = stackString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

      const reduxPayload = {
        ...payload,
        stack: formattedStack,
      };

      if (mode === "editing") {
        if (!projectID) throw new Error("Project ID is missing");
        
        // Send 'dbPayload' (string stack) to firebase service
        const response = await updateProject(dbPayload, projectID);
        
        if (response.success) {
          // Send 'reduxPayload' (array stack) to Redux store
          dispatch(
            updateProjectDetail({
              _id: projectID,
              ...reduxPayload,
            })
          );
          toast.success(response.message);
          onClose();
        } else {
          throw new Error(response.message);
        }
      } else {
        // Fix: Send 'dbPayload' (string stack) to firebase service
        const response = await addItem("projects", dbPayload);
        if (response && response.id) {
        
          // Fix: Send 'reduxPayload' (array stack) to Redux store
          dispatch(
            addNewProject({
              _id: response.id,
              ...reduxPayload,
            })
          );
          toast.success("Project Added Successfully");
          onClose(); 
        } else {
          throw new Error("Couldn't Add Project");
        }
      }
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error(`Failed to ${mode === "editing" ? "save" : "add"} project.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (project && mode === "editing") {
        setNewImageFile(null);
        setProjectID(project._id);
        
        const currentStack = project.stack || [];
        setIsDevOps(currentStack.some(s => s.toLowerCase() === 'devops'));
        setIsUIUX(currentStack.some(s => s.toLowerCase() === 'ui/ux'));

        setFormData({
          title: project.title || "",
          description: project.description || "",
          url: {
            demo: project.url.demo || "",
            code: project.url.code || "",
            image: project.url.image || "",
            image_public_id: project.url.image_public_id || "",
          },
          version: project.version || "",
          date: project.date || "",
          stack: project.stack.join(", ") || "",
        });
      } else {
        setNewImageFile(null);
        setProjectID(null);
        setIsDevOps(false);
        setIsUIUX(false);
        setFormData({
          title: "",
          description: "",
          url: {
            image: "",
            image_public_id: "",
            code: "",
            demo: "",
          },
          date: "",
          stack: "",
          version: "",
        });
      }
    }
  }, [project, isOpen, mode]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name.includes("url")) {
      const urlKey = e.target.name.split("-")[1];
      setFormData({
        ...formData,
        url: { ...formData.url, [urlKey]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900 sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">{`${
            project !== null ? "Edit Project" : "Add New Project"
          }`}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3">
          <ImageUpload
            label="Project Cover"
            currentImage={formData.url.image}
            onFileSelect={(file) => setNewImageFile(file)}
            mode={mode}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. E-Commerce Dashboard"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Version
              </label>
              <input
                name="version"
                value={formData.version}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                placeholder="e.g. 1.0.4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={
                  formData.date
                    ? new Date(formData.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label className="text-sm font-semibold text-slate-300">
              Tech Stack{" "}
              <span className="text-xs text-slate-500 font-normal">
                (Comma separated)
              </span>
            </label>
            <input
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
              placeholder="React, TypeScript, Tailwind, Firebase"
            />
            
            {/* Checkboxes */}
            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isDevOps ? 'bg-blue-600 border-blue-600' : 'border-slate-600 group-hover:border-slate-400'}`}>
                  {isDevOps && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                </div>
                <input 
                  type="checkbox" 
                  checked={isDevOps} 
                  onChange={(e) => setIsDevOps(e.target.checked)} 
                  className="hidden" 
                />
                <span className="text-sm text-slate-300 group-hover:text-white">DevOps Project</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isUIUX ? 'bg-blue-600 border-blue-600' : 'border-slate-600 group-hover:border-slate-400'}`}>
                   {isUIUX && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                </div>
                <input 
                  type="checkbox" 
                  checked={isUIUX} 
                  onChange={(e) => setIsUIUX(e.target.checked)} 
                  className="hidden" 
                />
                <span className="text-sm text-slate-300 group-hover:text-white">UI/UX Project</span>
              </label>

               <label className="flex items-center gap-2 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isFullstack ? 'bg-blue-600 border-blue-600' : 'border-slate-600 group-hover:border-slate-400'}`}>
                   {isFullstack && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                </div>
                <input 
                  type="checkbox" 
                  checked={isFullstack} 
                  onChange={(e) => setIsFullstack(e.target.checked)} 
                  className="hidden" 
                />
                <span className="text-sm text-slate-300 group-hover:text-white">FullStack Project</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Live Demo URL
              </label>
              <input
                name="url-demo"
                value={formData.url.demo}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                GitHub URL
              </label>
              <input
                name="url-code"
                value={formData.url.code}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <label className="text-sm font-semibold text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none resize-none leading-relaxed"
              placeholder="Describe the key features and challenges..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              {loading && (
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;