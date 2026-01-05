import { Project } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Project[] = [];

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (_state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
    updateProjectDetail: (state, action: PayloadAction<Project>) => {
      const index = state.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        // Replace the old project with the new one
        state[index] = action.payload;
      }
    },
    addNewProject:(state,action: PayloadAction<Project>)=>{
      state.unshift(action.payload)
    },

    // (Optional) Handy for deletion too
    deleteProject: (state, action: PayloadAction<string>) => {
      return state.filter((p) => p._id !== action.payload);
    },
  },
});

export const { setProjects,updateProjectDetail,addNewProject,deleteProject} = ProjectSlice.actions;
export default ProjectSlice.reducer;
