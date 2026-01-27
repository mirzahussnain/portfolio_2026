import { Message } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:Message[]=[]

const inboxSlice=createSlice({
    name:'inbox',
    initialState,
    reducers:{
        setMessages:(_state,action:PayloadAction<Message[]>)=>{
            return action.payload;
        },
        updateReadStatus:(state,action:PayloadAction<string>)=>{
            const index=state.findIndex((m)=>m._id===action.payload)
            if(index!==-1){
                state[index].read=true;
            }
        },
        deleteMessage:(state,action:PayloadAction<string>)=>{
            return state.filter((m)=>m._id!==action.payload)
        },
        addNewMessage:(state,action:PayloadAction<Message>)=>{
            state.unshift(action.payload)
        }
    }
});

export const {setMessages,updateReadStatus,deleteMessage,addNewMessage}=inboxSlice.actions
export default inboxSlice.reducer