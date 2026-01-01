import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ScrollToHash from "../components/ui/ScrollToHash";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
