import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import { fetchAdminDocument, fetchCollection } from "../firebase/services";
import { setAbout } from "../redux/features/AboutSlice";
import { setEducation } from "../redux/features/EducationSlice";
import { setExperiences } from "../redux/features/ExperienceSlice";
import { setProjects } from "../redux/features/ProjectSlice";
import { setSkills } from "../redux/features/SkillSlice";
import {
  About,
  Skill,
  Project,
  Experience,
  Education,
  Message,
} from "../types";
import { setMessages } from "../redux/features/MessageSlice";
import { toast } from "sonner";

const AdminLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
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
        console.error("Dashboard Load Error:", error);
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

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
