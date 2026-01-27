import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice"
import aboutReducer from "./features/AboutSlice"
import skillReducer from "./features/SkillSlice"
import projectReducer from "./features/ProjectSlice"
import experienceReducer from "./features/ExperienceSlice"
import educationReducer from "./features/EducationSlice"
import inboxReducer from './features/MessageSlice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        about:aboutReducer,
        skills:skillReducer,
        projects:projectReducer,
        experiences:experienceReducer,
        educations:educationReducer,
        inbox:inboxReducer,
    },

})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
