import { deleteItem, updateMessage } from "@/src/firebase/services"
import { deleteMessage, updateReadStatus } from "@/src/redux/features/MessageSlice"
import { RootState } from "@/src/redux/store"
import { Message } from "@/src/types"
import { i } from "motion/react-client"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"


const Inbox = () => {
    const messages=useSelector((state:RootState)=>state.inbox)
    const dispatch=useDispatch();
    const handleDelete=async(id:string)=>{
       if(!id) {toast.error('Message id not found.'); return null}
       try{
        const res=await deleteItem("messages",id)
        if(res.success){
            dispatch(deleteMessage(id));
            toast.success(res.message)
        }
        else{
            toast.error(`Operation Failed:${res.message}`)
        }
       }catch(error){
         toast.error(`Operation Failed:${error?.message}`)
       }
    }
    const handleUpdateMessage=async(id:string,data:Message)=>{
        if(!id){
            toast.error("Message Id is missing!")
            return null
        }
        try{
            const updatedMessage={
                name:data.name,
                email:data.email,
                read:!data.read,
                message:data.message,
                date:data.date,
                subject:data.subject
            }
            const res=await updateMessage(updatedMessage,id);
            if(res.success){
                dispatch(updateReadStatus(id));
                toast.success('Message Marked as Read!');
            }
            else{
                toast.error(`Operation Failed:${res.message}`)
            }
        }catch(error){
            toast.error(`Something went wrong:${error.message}`)
        }
    }
    if(messages.length===0){
        return(
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                <p>No messages in your inbox.</p>
            </div>
        )
      }
  return (
   <div className="grid gap-4">
    {messages.map((msg) => (
      <div key={msg._id} className="glass-card p-6 rounded-xl border border-white/5 group cursor-pointer">
        
        {/* Header: Name & Date */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">{msg.name}</h3>
            <p className="text-sm text-primary">{msg.email}</p>
          </div>
          <span className="text-xs text-slate-400">
             {/* Convert Firestore Timestamp to readable date */}
             {new Date(msg.date.toString()).toLocaleDateString()}
          </span>
        </div>

        {/* The Message Body */}
        <div className="bg-white/5 p-4 rounded-lg my-4 text-slate-300 text-sm">
          {msg.message}
        </div>

        {/* The Action Buttons */}
        <div className="flex gap-3 justify-end">
          {/* 🗑️ DELETE BUTTON */}
          <button 
            onClick={() => handleDelete(msg._id)}
            className="text-slate-500 hover:text-red-400 text-sm px-3 py-1.5 transition-colors"
          >
            Delete
          </button>

           <button 
            onClick={() => handleUpdateMessage(msg._id,msg)}
            className={`${msg.read?"text-blue-400/40":"text-slate-500 hover:text-red-400"} text-sm px-3 py-1.5 transition-colors cursor-pointer`}
            disabled={msg.read}
          >
            {msg.read?'Marked as Read':'Mark as Read'}
          </button>

          {/* 📧 REPLY BUTTON (The Magic Part) */}
          <a
            // 👇 This opens your default email app
            href={`mailto:${msg.email}?subject=Re: Inquiry from Portfolio&body=Hi ${msg.name},\n\nI received your message regarding...`}
            className="bg-primary text-background-dark font-bold text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">reply</span>
            Reply via Email
          </a>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Inbox