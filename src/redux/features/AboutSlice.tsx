import { About } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: About = {
  name: "",
  title: [],
  description: "",
  contactDetails: {
    email: "",
    githubUrl: "",
    linkedInUrl: "",
    twitterUrl: "",
    phone: "",
  },
   avatarUrl:"",
   resumeUrl:""
};

const AboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAbout(state, action: PayloadAction<About>) {
        
      return action.payload ;
            
    },
  },
});

export const { setAbout } = AboutSlice.actions;
export default AboutSlice.reducer;
