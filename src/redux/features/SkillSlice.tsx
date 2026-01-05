import { Skill } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:Skill[]=[]

const SkillSlice=createSlice({
    name:"skills",
    initialState,
    reducers:{
        setSkills:(state,action:PayloadAction<Skill[]>)=>{
          return action.payload;  
        },
        deleteSkill:(state,action:PayloadAction<string>)=>{
          return state.filter((skill)=>skill._id!==action.payload)
        },
        updateSkillDetails:(state,action:PayloadAction<Skill>)=>{
          const index=state.findIndex((s)=>s._id===action.payload._id)
          if(index !==-1){
            state[index]=action.payload
          }
        },
        addNewSkill:(state,action:PayloadAction<Skill>)=>{
          state.push(action.payload)
        }
    }
})

export const {setSkills,deleteSkill,updateSkillDetails,addNewSkill}=SkillSlice.actions;
export default SkillSlice.reducer;