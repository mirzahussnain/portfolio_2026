import { Experience } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:Experience[]=[]

const ExperienceSlice=createSlice({
    name:"experiences",
    initialState,
    reducers:{
        setExperiences:(_state,action:PayloadAction<Experience[]>)=>{
          return action.payload;  
        },
        deleteExperience:(state,action:PayloadAction<string>)=>{
          return state.filter((e)=>e._id!==action.payload)
        },
        updateExperienceDetails:(state,action:PayloadAction<Experience>)=>{
          const index=state.findIndex((e)=>e._id===action.payload._id)
          if(index!==-1){
            state[index]=action.payload

          }
        },
        addNewExperience:(state,action:PayloadAction<Experience>)=>{
          state.unshift(action.payload)
        }
    }
})

export const {setExperiences,addNewExperience,deleteExperience,updateExperienceDetails}=ExperienceSlice.actions;
export default ExperienceSlice.reducer;