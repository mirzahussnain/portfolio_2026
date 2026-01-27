import { RootState } from "@/src/redux/store";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LazyImage } from "../ui/LazyImage";
import { updateAboutDetails } from "@/src/firebase/services";
import { About } from "@/src/types";
import { setAbout } from "@/src/redux/features/AboutSlice";
import { uploadToCloudinary } from "@/src/lib/utils";
import { toast } from "sonner";

const ManageProfile = () => {
  const aboutData = useSelector((state: RootState) => state.about);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // --- STATES FOR FILES ---
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newResumeFile, setNewResumeFile] = useState<File | null>(null);
  
  // --- PREVIEWS ---
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [resumeName, setResumeName] = useState<string>(""); // To show "resume.pdf" selected

  const [formData, setFormData] = useState<About | null>(null);
  
  // --- REFS ---
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Sync Redux data with local state
  useEffect(() => {
    if (aboutData) {
      setFormData(aboutData);
      setPreviewUrl(aboutData.avatar_url || "");
      setResumeName(""); // Reset resume name on fresh load
    }
  }, [aboutData]);

  // 1. Handle Avatar Selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. Handle Resume Selection
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewResumeFile(file);
      setResumeName(file.name); // Show the filename to the user
    }
  };

  const handleSaveChanges = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      let payload = { ...formData };

      // --- UPLOAD AVATAR (if changed) ---
      if (newImageFile) {
        const avatarUpload = await uploadToCloudinary(
          newImageFile,
          'portfolio-2026/about/avatar',
          "image"
        );
        if (avatarUpload?.url) {
           payload.avatar_url = avatarUpload.url;
        }
      }

      // --- UPLOAD RESUME (if changed) ---
      if (newResumeFile) {
        // Note: You might want a different folder for resumes
        const resumeUpload = await uploadToCloudinary(
          newResumeFile,
          'portfolio-2026/about/resume',
          "auto" 
        );
        if (resumeUpload?.url) {
           payload.resume_url = resumeUpload.url;
        }
      }

      // 3. Update Firestore
      const result = await updateAboutDetails(payload);

      if (result.success) {
        dispatch(setAbout(payload));
        
        // Reset everything
        setIsEditing(false);
        setNewImageFile(null);
        setNewResumeFile(null);
        setResumeName("");
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (aboutData) {
        setFormData(aboutData);
        setPreviewUrl(aboutData.avatar_url || "");
        setNewImageFile(null);
        setNewResumeFile(null);
        setResumeName("");
    }
    setIsEditing(false);
  };

  if (!aboutData && !formData) return <div className="text-white">Loading profile...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative max-w-4xl">
      
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Profile Management</h3>
          <p className="text-slate-400 text-sm">Update your personal details.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="text-slate-400 hover:text-white px-4 py-2 text-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-background-dark px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        
        {/* --- AVATAR SECTION --- */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
            {previewUrl ? (
              <LazyImage
                src={previewUrl}
                alt="Profile"
                className={`w-full h-full object-cover ${loading ? 'opacity-50' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
            )}

            {isEditing && (
               <div 
                 onClick={() => avatarInputRef.current?.click()}
                 className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
               >
                 <span className="material-symbols-outlined text-white text-3xl mb-2">add_a_photo</span>
                 <span className="text-white text-xs font-bold uppercase tracking-wider">Change Photo</span>
               </div>
             )}
             <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
          </div>
        </div>

        {/* --- DETAILS SECTION --- */}
        <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
          
          {/* Name & Bio (Same as before) */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Display Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData?.name || ""}
                onChange={(e) => setFormData(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            ) : (
              <h2 className="text-xl font-bold text-white">{aboutData?.name}</h2>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">About Description</label>
            {isEditing ? (
              <textarea
                rows={6}
                value={formData?.description || ""}
                onChange={(e) => setFormData(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none leading-relaxed"
              />
            ) : (
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{aboutData?.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
               <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Contact Email</label>
               {isEditing ? (
                  <input
                    type="email"
                    value={formData?.contact_details?.email || ""}
                    onChange={(e) => setFormData(prev => prev ? ({ 
                        ...prev, 
                        contact_details: { ...prev.contact_details, email: e.target.value } 
                    }) : null)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 text-sm"
                  />
               ) : (
                  <p className="text-white text-sm font-mono">{aboutData?.contact_details?.email}</p>
               )}
            </div>

            {/* --- RESUME SECTION --- */}
            <div className="space-y-2">
               <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Resume</label>
               
               {isEditing ? (
                  <div className="flex gap-2">
                    {/* Read-only input showing URL or new filename */}
                    <input
                        type="text"
                        readOnly
                        value={resumeName || formData?.resume_url || ""}
                        className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-slate-400 text-sm cursor-not-allowed"
                    />
                    {/* Upload Button */}
                    <button
                        onClick={() => resumeInputRef.current?.click()}
                        className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-white transition-colors"
                        title="Upload PDF"
                    >
                        <span className="material-symbols-outlined text-lg">upload_file</span>
                    </button>
                    <input 
                        type="file" 
                        ref={resumeInputRef} 
                        onChange={handleResumeChange} 
                        accept=".pdf,.doc,.docx" 
                        className="hidden" 
                    />
                  </div>
               ) : (
                  <a 
                    href={`https://docs.google.com/gview?url=${encodeURIComponent(aboutData.resume_url)}&embedded=true`}
                    target="_blank" 
                    rel="noreferrer"
                    className="text-primary text-sm hover:underline truncate block flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">description</span>
                    {aboutData?.resume_url ? "View Resume" : "No resume linked"}
                  </a>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageProfile;