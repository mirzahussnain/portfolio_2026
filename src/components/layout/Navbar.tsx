import React, { useEffect, useState, useRef, use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { MdOutlineMenu } from "react-icons/md";
import { VscClose } from "react-icons/vsc";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isMenuOpen,setMenuOpen]=useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const location = useLocation();
  const navigateTo = useNavigate();

  // 1. CREATE A LOCK
  // This ref tracks if the scroll is happening because the user clicked a link
  const isClickedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Home", href: "/#home", id: "home" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  // 2. CLICK HANDLER
  // Call this whenever a nav link is clicked
  const handleNavClick = () => {
    isClickedRef.current = true;

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Release the lock after 1 second (enough time for smooth scroll to finish)
    timeoutRef.current = setTimeout(() => {
      isClickedRef.current = false;
    }, 1000);
  };

  // Sync active tab with URL hash on load/change
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && navItems.some((item) => item.id === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger in the middle of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Always update the visual tab
          setActiveTab(entry.target.id);

          // 3. CHECK THE LOCK BEFORE UPDATING URL
          // Only update the URL if the user is NOT currently click-scrolling
          if (!isClickedRef.current) {
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Removed dependency on location to avoid re-attaching constantly

  return (
  <>
    <header className="fixed top-0 z-50 w-full border-b border-glass-border bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
       <div className="flex items-center gap-20">
       <button className="md:hidden cursor-pointer transition-transform" onClick={()=>{setMenuOpen(!isMenuOpen)}}>
          {isMenuOpen?<VscClose size={28} />:<MdOutlineMenu size={28}/>}
       </button>
        <div
          className="flex items-center gap-3 cursor-pointer group  max-sm:w-100 max-sm:justify-start"
          onClick={() => {
            handleNavClick(); 
            navigateTo("/#home");
          }}
        >
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[24px]">
              terminal
            </span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            Hussnain-Ali
          </h2>
        </div>

       </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              // 4. ATTACH CLICK HANDLER
              onClick={handleNavClick}
              className={`relative group py-1`}
            >
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out ${
                  activeTab === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {isAuthenticated ? (
          <button className="rounded-full cursor-pointer">
            <img
              src={`https://picsum.photos/seed/${Math.random()}/800/450`}
              alt="Admin Avatar"
              className="object-cover w-11 h-11 rounded-full"
            />
          </button>
        ) : (
          <div className="md:flex items-center gap-4 hidden">
            <button
              onClick={() => navigateTo("/signin")}
              className="text-primary text-sm font-bold hover:text-primary/80 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <Link
              to="/#contact"
              onClick={handleNavClick} // Apply lock here too
              className="bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold py-2 px-5 rounded-lg transition-all shadow-[0_0_15px_rgba(13,185,242,0.3)]"
            >
              Contact Me
            </Link>
          </div>
        )}
      </div>
    </header>

    <div className={`${isMenuOpen?'block':'hidden'} md:hidden fixed top-16 left-0 flex flex-col  glass-card min-w-xs rounded-r-2xl z-50 shadow-lg  `}>
      {navItems.map((item) => (
            <Link to={item.href} key={item.label} className={`w-full px-3 py-3  rounded-r-lg text-lg  font-medium tracking-wide border-b-2 border-b-white/10
            ${activeTab === item.id
                    ? "bg-primary/10 text-white"
                    : "text-slate-400 bg-black/10"}`}>
              {item.label}
            </Link>
          ))}
        {isAuthenticated?(
          <Link to="/admin/dashboard" className={`w-full px-3 py-3 rounded-lg text-lg  font-medium tracking-wide border-b-2 border-b-white/10`}/>
        ):(
           <button
              onClick={() => navigateTo("/signin")}
              className="bg-primary text-lg font-bold  text-gray-800 transition-colors cursor-pointer mx-auto px-10 py-2 rounded-xl my-2"
            >
              Sign In
            </button>
        )}
    </div>
  </>

    
  );
};

export default Navbar;
