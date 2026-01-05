// src/firebase/services.ts
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  increment,
} from "firebase/firestore";
import { db } from "./config";
import { About, Education, Experience, Project, Skill } from "../types";

// --- FETCHING DATA ---
export const fetchAdminDocument = async () => {
  const ref = doc(db, "portfolio", "admin");
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    const data = { ...snapshot.data() };
    return { _id: snapshot.id, ...data.about } as About;
  } else {
    throw new Error("Admin document does not exist.");
  }
};
export const fetchCollection = async (collectionName: string) => {
  const ref = collection(db, "portfolio", "admin", collectionName);
  const snapshot = await getDocs(ref);
  if (!snapshot.empty) {
    const items = snapshot.docs.map((doc) => {
      const data = doc.data();

      const serializedData: any = { ...data };

      Object.keys(serializedData).forEach((key) => {
        const value = serializedData[key];
        if (value instanceof Timestamp) {
          serializedData[key] = value.toDate().toISOString();
        }
      });

      return { _id: doc.id, ...serializedData };
    });

    switch (collectionName) {
      case "skills":
        return items as Skill[];
      case "projects":
        return items as Project[];
      case "experiences":
        return items as Experience[];
      case "qualifications":
        return items as Education[];
      default:
        return items;
    }
  } else {
    throw new Error(`No documents found in collection: ${collectionName}`);
  }
};

// --- ADDING DATA ---
export const addItem = async (collectionName: string, data: any) => {
  try {
    const ref = collection(db, "portfolio", "admin", collectionName);
    let response;
    switch (collectionName) {
      case "projects":
        const projectDetails: Project = {
          ...data,
          stack: data.stack
            .split(",")
            .map((stack) => stack.trim())
            .filter((stack) => stack !== ""),
        };
        response = await addDoc(ref, {
          ...data,
          date: Timestamp.fromDate(new Date(projectDetails.date)),
          stack: projectDetails.stack,
        });
        break;
      case "skills":
        const skillDetails: Skill = { ...data, order: Number(data.order) };
        response = await addDoc(ref, {
          ...skillDetails,
        });
        break;
      case "qualifications":
        const qualification: Education = {
          ...data,
          ending_date: Timestamp.fromDate(new Date(data.ending_date)),
          starting_date: Timestamp.fromDate(new Date(data.starting_date)),
        };
        response = await addDoc(ref, {
          ...qualification,
        });
        break;
      case "experiences":
        const experience: Experience = {
          ...data,
          ending_date: Timestamp.fromDate(new Date(data.ending_date)),
          starting_date: Timestamp.fromDate(new Date(data.starting_date)),
        };
        
        response = await addDoc(ref, { ...experience });
        break;
    }

    return response;
  } catch (error) {
    return { sucess: false, message: error.message };
  }
};

// --- DELETING DATA ---
export const deleteItem = async (collectionName: string, id: string) => {
  try {
    const ref = doc(db, "portfolio", "admin", collectionName, id);
    await deleteDoc(ref);
    return {
      success: true,
      message: `${
        collectionName === "projects"
          ? "Project"
          : collectionName === "skills"
          ? "Skill"
          : collectionName === "experiences"
          ? "Experience"
          : "Education/Qualification"
      } Deleted Successfully`,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// --- UPDATING DATA ---
export const incrementViewCount = async () => {
  try {
    // Atomic increment: Safe even if 100 people visit at once
    const ref = doc(db, "stats", "portfolio-metrics");
    await updateDoc(ref, {
      "views.count": increment(1),
    });
  } catch (error) {
    console.error("Failed to track view:", error);
  }
};

export const updateProject = async (
  formData: {
    title: string;
    description: string;
    url: {
      image: string;
      image_public_id: string;
      code: string;
      demo: string;
    };
    date: string;
    stack: string;
    version: string;
  },
  projectID: string | null
) => {
  const docRef = doc(db, "portfolio", "admin", "projects", projectID);
  const image = formData.url.image;
  const image_public_id = formData.url.image_public_id;

  try {
    await updateDoc(docRef, {
      title: formData.title,
      description: formData.description,
      version: formData.version,
      date: Timestamp.fromDate(new Date(formData.date)),
      stack: formData.stack
        .split(",")
        .map((stack) => stack.trim())
        .filter((stack) => stack !== ""),
      url: {
        image: image,
        image_public_id: image_public_id,
        code: formData.url.code,
        demo: formData.url.demo,
      },
    });
    return { success: true, message: "Project updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateSkill = async (
  formData: {
    name: string;
    level: string;
    category: string;
    colorClass: string;
    icon: string;
  },
  skillID: string | null
) => {
  if (!skillID) return { success: false, message: "Skill Id Not Found" };
  try {
    const ref = doc(db, "portfolio", "admin", "skills", skillID);
    await updateDoc(ref, formData);
    return { success: true, message: "Skill updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateExperience = async (
  formData: {
    role: string;
    responsibilities: string;
    ending_date: string;
    starting_date: string;
    skills: string;
    company: string;
  },
  experienceId: string
) => {
  try {
    const docRef = doc(
      db,
      "portfolio",
      "admin",
      "experiences",
      experienceId
    );
    const response = await updateDoc(docRef, {
      ...formData,
      ending_date: Timestamp.fromDate(new Date(formData.ending_date)),
      starting_date: Timestamp.fromDate(new Date(formData.starting_date)),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    });

     return { success: true, message: "Experience updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateEducation = async (
  formData: {
    title: string;
    description: string;
    ending_date: string;
    starting_date: string;
    grade: string;
    major:string;
    institution:string,
    type: string;
  },
  qualificationId: string
) => {
  try {
    const docRef = doc(
      db,
      "portfolio",
      "admin",
      "qualifications",
      qualificationId
    );
    const response = await updateDoc(docRef, {
      ...formData,
      ending_date: Timestamp.fromDate(new Date(formData.ending_date)),
      starting_date: Timestamp.fromDate(new Date(formData.starting_date)),
      
    });

     return { success: true, message: "Education updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};