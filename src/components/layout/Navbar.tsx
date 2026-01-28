import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/redux/store";
import { logout } from "@/src/redux/features/AuthSlice"; 
import { MdOutlineMenu, MdDashboard, MdLogout } from "react-icons/md"; 
import { VscClose } from "react-icons/vsc";
import { Logo } from "../ui/Logo"; // 👈 IMPORT YOUR LOGO HERE

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const aboutData = useSelector((state: RootState) => state.about);
  const dispatch = useDispatch(); 

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  
  // State for Profile Dropdown
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null); 

  const [activeTab, setActiveTab] = useState<string>("home");
  const location = useLocation();
  const navigateTo = useNavigate();

  // 1. CREATE A LOCK
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
  const handleNavClick = () => {
    isClickedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isClickedRef.current = false;
    }, 1000);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); 
    setProfileOpen(false);
    navigateTo("/");
  };

  // --- Click Outside Listener for Profile Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
          if (!isClickedRef.current) {
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-glass-border bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-20">
            <button
              className="md:hidden cursor-pointer transition-transform"
              onClick={() => {
                setMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <VscClose size={28} /> : <MdOutlineMenu size={28} />}
            </button>
            
            {/* --- UPDATED BRANDING SECTION --- */}
            <div
              className="flex items-center gap-3 cursor-pointer group max-sm:w-100 max-sm:justify-start"
              onClick={() => {
                handleNavClick();
                navigateTo("/#home");
              }}
            >
              {/* Logo Container */}
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors">
             
                <Logo className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>

              {/* Wordmark */}
              <h2 className="text-white text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                {aboutData?.name || "Hussnain-Ali"}
              </h2>
            </div>
            {/* -------------------------------- */}

          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
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
            // Profile Dropdown Wrapper ---
            <div className="relative" ref={profileRef}>
              <button 
                className="rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 border-2 border-transparent hover:border-primary/50"
                onClick={() => setProfileOpen(!isProfileOpen)}
              >
                <img
                  src={aboutData.avatar_url || `https://picsum.photos/seed/${Math.random()}/800/450`}
                  alt="Admin Avatar"
                  className="object-cover w-11 h-11 rounded-full"
                />
              </button>

              {/* The Modal/Dropdown --- */}
              {isProfileOpen && (
                <div className="absolute top-14 right-0 w-48 bg-background-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Account</p>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <MdDashboard className="text-primary text-lg" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                  >
                    <MdLogout className="text-lg" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
                onClick={handleNavClick}
                className="bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold py-2 px-5 rounded-lg transition-all shadow-[0_0_15px_rgba(13,185,242,0.3)]"
              >
                Contact Me
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-16 left-0 flex flex-col glass-card rounded-tr-2xl min-w-xs rounded-r-2xl z-100 shadow-lg`}
      >
        {navItems.map((item) => (
          <Link
            to={item.href}
            key={item.label}
            onClick={() => setMenuOpen(false)} // Close menu on click
            className={`w-full px-3 py-3 text-lg first-of-type:rounded-tr-2xl font-medium tracking-wide border-b-2 border-b-white/10 ${
              activeTab === item.id
                ? "bg-primary/60 text-white"
                : "text-slate-400 bg-black/80"
            }`}
          >
            {item.label}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="w-full px-3 py-3 rounded-lg text-lg bg-black/80 text-slate-400 font-medium tracking-wide border-b-2 border-b-white/10 flex items-center gap-2"
            >
              <MdDashboard /> Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-3 py-3 bg-black/80 rounded-lg text-lg text-red-400 font-medium tracking-wide flex items-center gap-2 text-left"
            >
              <MdLogout /> Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
                navigateTo("/signin");
                setMenuOpen(false);
            }}
            className="bg-primary text-lg font-bold text-gray-800 transition-colors cursor-pointer mx-auto px-10 py-2 rounded-xl my-2"
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;