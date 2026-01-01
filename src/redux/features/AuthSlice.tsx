import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated:boolean;
    user: null | {name:string, email:string};
    token: null | string;
}

const storedToken =localStorage.getItem('token');
const storedUser =localStorage.getItem('user');

const initialState:AuthState={
    isAuthenticated: !!storedToken,
    user:storedUser?JSON.parse(storedUser):null,
    token:storedToken || null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action:PayloadAction<{user:any,token:string}>)=>{
            const {user,token}=action.payload;
            state.user=user;
            state.token=token;
            state.isAuthenticated=true;
            
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
    
});

export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer;