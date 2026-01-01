import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";


const AdminLayout = () => {
    const isAuthenticated=useSelector((state:RootState)=>state.auth.isAuthenticated);


    if(!isAuthenticated){
        return <Navigate to="/signin" replace />;
    }
  return (
    <div className="min-h-screen">
        <Outlet/>
    </div>
  )
}

export default AdminLayout