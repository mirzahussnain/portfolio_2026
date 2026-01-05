import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./config"


export const loginUser=async(email:string,pass:string)=>{
    try{
        const userCredentials=await signInWithEmailAndPassword(auth,email,pass);
        return userCredentials.user;
    
    }
    catch(error){
        throw new Error(error.message)
    //    alert(cleanErrorMessage(error.message));
    }
}

export const logoutUser=async()=>{
    await signOut(auth);
}

export const cleanErrorMessage=(errorMessage:string)=>{
    
    if(errorMessage.includes("auth/user-not-found") || errorMessage.includes("auth/invalid-credential")){
        return "Invalid email or password. Please try again.";
    }
    else if (errorMessage.includes("auth/too-many-requests")) {
      return "Too many failed attempts. Please try again later.";
    }
    else return errorMessage;
}