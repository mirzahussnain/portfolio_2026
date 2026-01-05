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
import { Timestamp } from "firebase/firestore";

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
  // Track the raw file separately
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [projectID, setProjectID] = useState<string | null>(null);
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
        // 2. NOW we upload to Cloudinary (Lazy Upload)
        const uploadData = await uploadToCloudinary(newImageFile);

        payload = {
          ...payload,
          url: {
            ...payload.url,
            image: uploadData.url,
            image_public_id: uploadData.publicId,
          },
        };

        // (Optional: Here you could call a backend API to delete the OLD image using formData.imagePublicId)
      }

      const formattedStack = payload.stack
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

      if (mode === "editing") {
        if (!projectID) throw new Error("Project ID is missing");
        const response = await updateProject(formData, projectID);
        if (response.success) {
          dispatch(
            updateProjectDetail({
              _id: projectID,
              ...payload,
              stack: formattedStack,
            })
          );
          alert(response.message);
          onClose();
        } else {
          throw new Error(response.message);
        }
      } else {
        const response = await addItem("projects", payload);
        if (response && response.id) {
        
          dispatch(
            addNewProject({
              _id: response.id,
              ...payload,
              stack: formattedStack,
            })
          );
          alert("Project Added Successfully");
        } else {
          throw new Error("Couldn't Add Project");
        }
      }
    } catch (error) {
      console.error("Operation failed:", error);
      alert(`Failed to ${mode === "editing" ? "save" : "add"} project.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only update form state when the modal is OPEN
    if (isOpen) {
      if (project && mode === "editing") {
        // --- EDIT MODE: Populate with Project Data ---
        setNewImageFile(null);
        setProjectID(project._id);
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
        // --- ADD MODE: Clear Everything ---
        setNewImageFile(null);
        setProjectID(null);
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
  }, [project,isOpen,mode]);

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
      {/* Modal Container */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        {/* Header */}
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
            currentImage={formData.url.image} // Show the (existing image by default for Edit Existing Project) | (default random image for create new project)
            onFileSelect={(file) => setNewImageFile(file)} // Just store the file in state
            mode={mode}
          />

          {/* Title & Version Row */}
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
                // Input[type=date] REQUIRES format "YYYY-MM-DD".
                // We convert your state safely to valid format.
                value={
                  formData.date
                    ? new Date(formData.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                // [color-scheme:dark] ensures the calendar popup matches your dark theme
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
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
          </div>

          {/* Links Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Description */}
          <div className="space-y-2">
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

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
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
