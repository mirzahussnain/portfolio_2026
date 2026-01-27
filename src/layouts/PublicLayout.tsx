import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ScrollToHash from "../components/ui/ScrollToHash";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import { useDispatch } from "react-redux";
import { fetchAdminDocument, fetchCollection } from "../firebase/services";
import { About, Education, Experience, Message, Project, Skill } from "../types";
import { setAbout } from "../redux/features/AboutSlice";
import { setSkills } from "../redux/features/SkillSlice";
import { setExperiences } from "../redux/features/ExperienceSlice";
import { setEducation } from "../redux/features/EducationSlice";
import { setProjects } from "../redux/features/ProjectSlice";
import { setMessages } from "../redux/features/MessageSlice";
import { toast } from "sonner";

const PublicLayout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      //Fetch about data
      try {
        const [
          aboutDetails,
          skillsDetails,
          projectsDetails,
          experienceDetails,
          educationDetails,
          messageDetails,
        ] = await Promise.all([
          fetchAdminDocument(),
          fetchCollection("skills"),
          fetchCollection("projects"),
          fetchCollection("experiences"),
          fetchCollection("qualifications"),
          fetchCollection("messages"),
        ]);

        if (aboutDetails) dispatch(setAbout(aboutDetails as About));
        if (skillsDetails) dispatch(setSkills(skillsDetails as Skill[]));
        if (projectsDetails)
          dispatch(setProjects(projectsDetails as Project[]));
        if (experienceDetails)
          dispatch(setExperiences(experienceDetails as Experience[]));
        if (educationDetails)
          dispatch(setEducation(educationDetails as Education[]));
        if (messageDetails) dispatch(setMessages(messageDetails as Message[]));
      } catch (error) {
        console.error(" Portfolio Load Error:", error);
        toast.error(`Failed to load data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, [dispatch]);

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
      <Footer />
    </div>
  );
};

export default PublicLayout;
