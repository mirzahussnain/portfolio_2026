import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ScrollToHash from "../components/ui/ScrollToHash";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import { useDispatch } from "react-redux";
import { fetchAdminDocument, fetchCollection } from "../firebase/services";
import { About, Education, Experience, Project, Skill } from "../types";
import { setAbout } from "../redux/features/AboutSlice";
import { setSkills } from "../redux/features/SkillSlice";
import { setExperiences } from "../redux/features/ExperienceSlice";
import { setEducation } from "../redux/features/EducationSlice";
import { setProjects } from "../redux/features/ProjectSlice";

const PublicLayout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchPortfolioData=async()=>{
      setLoading(true)
      //Fetch about data
      try{
        const aboutDetails:About=await fetchAdminDocument();
        const skillsDetails:Skill[] | Project[] | Experience[] | Education[]=await fetchCollection("skills");
        const projectsDetails:Skill[] | Project[] | Experience[] | Education[]=await fetchCollection("projects");
        const experienceDetails:Skill[] | Project[] | Experience[] | Education[]=await fetchCollection("experiences");
        const educationDetails:Skill[] | Project[] | Experience[] | Education[]=await fetchCollection("qualifications");
        if(aboutDetails && skillsDetails && projectsDetails && experienceDetails && educationDetails ){
        const aboutData:About=aboutDetails;
       
         dispatch(setAbout(aboutData));
         dispatch(setSkills(skillsDetails as Skill[]))
         dispatch(setExperiences(experienceDetails as Experience[]))
         dispatch(setEducation(educationDetails as Education[]))
         dispatch(setProjects(projectsDetails as Project[]))
        }
      }catch(error){
        alert(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchPortfolioData();
  },[])


  if (loading) {
    return (
      <div className="h-screen w-full bg-background-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary font-mono text-sm tracking-widest animate-pulse">
            LOADING...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <ScrollToHash />
      <Navbar />
      <main>
        <Outlet />
      </main>
     <Footer/>
    </div>
  );
};

export default PublicLayout;
