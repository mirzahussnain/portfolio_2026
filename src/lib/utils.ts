export const stringToDate=(date:string)=>{
    return new Date(date)
}
 export const getYear=(date:Date)=>{
    const d=new Date(date);
    return d.getFullYear().toString();
  }


  export const toTime=(date:Date):number=>{
    const d=new Date(date);
    return isNaN(d.getTime())?new Date().getTime() : d.getTime();
  }

  export const getFullDate=(date:Date):string=>{
    const year=date.getFullYear();
    const day=date.getDate();
    const month=date.getMonth()
    return `${day}-${month}-${year}`

  }

  export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'portfolio-2026/projects');
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Cloudinary upload failed');

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id
  };
};

