import React, { useState, useEffect } from 'react';

interface ImageUploadProps {
  // We now pass the raw FILE back, not the URL
  onFileSelect: (file: File | null) => void;
  label?: string;
  currentImage?: string; // The existing URL (from database)
  mode?:string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onFileSelect, 
  label = "Upload Image", 
  currentImage ,
  mode
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  // Sync preview if the prop changes (e.g. opening a different project)
  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // 1. Create a fake local URL for preview
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      
      // 2. Pass the raw file to parent
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-300">{label}</label>
      <div className="flex items-start gap-4">
        <label className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 border-dashed border-slate-700 hover:border-white hover:bg-slate-800 transition-all group overflow-hidden">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required={mode==='creation'}/>
          <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-white mb-1">cloud_upload</span>
          <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-medium uppercase">Select File</span>
        </label>

        {preview && (
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-700 bg-black">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;