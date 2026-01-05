import React, { useState, useEffect } from "react";

import { Skill } from "@/src/types";
import { Icon } from "@iconify/react";
import { addItem, updateSkill } from "@/src/firebase/services";

import { useDispatch } from "react-redux";

import {
  addNewSkill,
  updateSkillDetails,
} from "@/src/redux/features/SkillSlice";
import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  TAILWIND_COLORS,
} from "@/src/lib/constants";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
  mode: "editing" | "creation";
}

interface SkillFormData {
  name: string;
  category: Skill["category"];
  level: Skill["level"];
  icon: string;
  colorClass: string;
  order: number | string;
}
const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  skill,
  mode,
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // 1. Local state to toggle the dropdown
  const [isColorOpen, setIsColorOpen] = useState(false);

  // 2. Helper to find the currently selected color object (for the preview)
  const [skillID, setSkillID] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    level: "beginner",
    category: "programming",
    icon: "",
    colorClass: "",
    order: 0,
  });
  const selectedColor =
    TAILWIND_COLORS.find((c) => c.class === formData.colorClass) ||
    TAILWIND_COLORS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "editing") {
        if (!skillID) throw new Error("Skill ID is missing");
        const response = await updateSkill(formData, skillID);
        if (response.success) {
          dispatch(
            updateSkillDetails({
              _id: skillID,
              ...formData,
              order:Number(formData.order),
              category: formData.category as Skill["category"],
              level: formData.level as Skill["level"],
            })
          );
          alert(response.message);
          onClose();
        } else {
          throw new Error(response.message);
        }
      } else {
        const response = await addItem("skills", formData);
        if (response && response.id) {
          dispatch(
            addNewSkill({
              _id: response.id,
              ...formData,
              order:Number(formData.order),
              category: formData.category as Skill["category"],
              level: formData.level as Skill["level"],
            })
          );
          alert("Skill Added Successfully");
        } else {
          throw new Error(`Couldn't Add Skill:${response.message}`);
        }
      }
    } catch (error) {
      console.error("Operation failed:", error);
      alert(`Failed to ${mode === "editing" ? "save" : "add"} skill.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only update form state when the modal is OPEN
    if (isOpen) {
      if (skill && mode === "editing") {
        // --- EDIT MODE: Populate with Skill Data ---

        setSkillID(skill._id);
        setFormData({
          name: skill.name || "",
          level: skill.level || "beginner",
          colorClass: skill.colorClass || "",
          icon: skill.icon || "",
          category: skill.category || 'programming',
          order: skill.order || 0,
        });
      } else {
        // --- ADD MODE: Clear Everything ---

        setSkillID(null);
        setFormData({
          name: "",
          level: "beginner",
          category: "programming",
          colorClass: "",
          icon: "",
          order: 0,
        });
      }
    }
  }, [skill, isOpen, mode]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900 sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">{`${
            skill !== null ? "Edit Skill" : "Add New Skill"
          }`}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3">
          {/* --- ICON PICKER SECTION --- */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-300">
                Icon String
              </label>
              {/* Link to the GLOBAL search, not just Material Symbols */}
              <a
                href="https://icon-sets.iconify.design/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
              >
                Search All Icons
                <span className="material-symbols-outlined text-[12px]">
                  open_in_new
                </span>
              </a>
            </div>

            <div className="flex gap-4">
              {/* Input Field */}
              <div className="relative grow">
                <input
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 outline-none font-mono text-sm"
                  // Updated placeholder to show examples of different sets
                  placeholder="e.g. logos:react, skill-icons:nodejs-dark"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-[18px]">
                  search
                </span>
              </div>

              {/* Live Preview Box */}
              <div className="shrink-0 w-12 h-11 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                {formData.icon ? (
                  <Icon
                    // 🟢 FIX: Use the raw string so you can type ANY set
                    icon={formData.icon}
                    className="text-2xl text-white transition-all"
                  />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
            </div>

            {/* Helpful Tips for Tech Stacks */}
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>Popular sets for developers:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">
                  logos:
                </span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">
                  skill-icons:
                </span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">
                  simple-icons:
                </span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">
                  mdi:
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-slate-300">
              Color Theme
            </label>

            {/* TRIGGER BUTTON (Replaces the Input) */}
            <button
              type="button"
              onClick={() => setIsColorOpen(!isColorOpen)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none flex items-center justify-between transition-colors hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                {/* Color Circle Preview */}
                <span
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: selectedColor?.hex || "#ccc" }}
                />
                <span className="text-sm text-slate-200">
                  {selectedColor?.name || "Select a color"}
                </span>
              </div>

              {/* Chevron Icon */}
              <span className="material-symbols-outlined text-slate-400 text-[20px]">
                {isColorOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {/* DROPDOWN MENU */}
            {isColorOpen && (
              <>
                {/* Invisible backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsColorOpen(false)}
                />

                <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                  <div className="p-1 grid grid-cols-1 gap-0.5">
                    {TAILWIND_COLORS.map((color) => (
                      <button
                        key={color.class}
                        type="button"
                        onClick={() => {
                          // 3. Update State using your existing handleChange pattern
                          // We create a synthetic event so we don't need to rewrite your handleChange
                          handleChange({
                            target: {
                              name: "colorClass",
                              value: color.class,
                            },
                          } as any);
                          setIsColorOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left
                  ${
                    formData.colorClass === color.class
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. ReactJS, Figma, ExpressJS "
                required
              />
            </div>
            <div className="space-y-2 grow">
              <label className="text-sm font-semibold text-slate-300">
                Order
                <span className="text-xs text-slate-500 font-normal text-nowrap">
                  (1=Top Priority, 2=Second,..)
                </span>
              </label>
              <input
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none"
                placeholder="e.g. 1,2,3"
              />
            </div>
          </div>

          <div className="space-y-2 my-2 ">
            <label className="text-sm font-semibold text-slate-300">
              Category
            </label>
            <div className="flex flex-wrap gap-4">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    handleChange({
                      target: { name: "category", value: cat },
                    } as any);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize cursor-pointer
          ${
            formData.category === cat
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-500"
              : "bg-slate-950 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white hover:bg-blue-600"
          }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-2 my-2">
            <label className="text-sm font-semibold text-slate-300">
              Proficiency Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    // Manual state update
                    handleChange({
                      target: { name: "level", value: lvl },
                    } as any);
                  }}
                  className={`px-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer
          ${
            formData.level === lvl
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-500 transform scale-[1.02]"
              : "bg-slate-950 text-slate-500 border border-white/10 hover:border-white/20 hover:text-slate-300 hover:bg-blue-600"
          }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
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

export default SkillModal;
