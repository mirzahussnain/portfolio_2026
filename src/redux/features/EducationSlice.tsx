import { Education } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:Education[]=[]

const EducationSlice=createSlice({
    name:"educations",
    initialState,
    reducers:{
        setEducation:(_state,action:PayloadAction<Education[]>)=>{
          return action.payload;  
        },
        deleteEducation:(state,action:PayloadAction<string>)=>{
          return state.filter((e)=>e._id!==action.payload)
        },
        addNewEducation:(state,action:PayloadAction<Education>)=>{
          state.unshift(action.payload)
        },
        updateEducationDetails:(state,action:PayloadAction<Education>)=>{
          const index=state.findIndex((e)=>e._id==action.payload._id)
          if(index!==-1){
            state[index]=action.payload
          }
        }
    }
})

export const {setEducation,deleteEducation,addNewEducation,updateEducationDetails}=EducationSlice.actions;
export default EducationSlice.reducer;