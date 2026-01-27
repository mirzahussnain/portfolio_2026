import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import { Logo } from "../ui/Logo";

const Footer = () => {
  const aboutData = useSelector((state: RootState) => state.about);
  return (
    <footer className="py-12 px-6 border-t border-glass-border bg-background-dark/50 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-colors group">
            <Logo className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-white font-bold tracking-tight">
            {aboutData?.name || "Hussnain Ali"}
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          {` © ${new Date().getFullYear()} Hussnain Ali. All rights reserved.`}
        </p>
        <div className="flex gap-4">
          <button
            className="text-slate-400 hover:text-white transition-colors"
            onClick={() =>
              window.open(
                `${aboutData?.contact_details?.twitter_url || "https://twitter.com/hussnainali_dev"}`,
                "_blank",
              )
            }
          >
            Twitter
          </button>
          <button
            className="text-slate-400 hover:text-white transition-colors"
            onClick={() =>
              window.open(
                `${aboutData?.contact_details?.github_url || "https://github.com/hussnainali"}`,
                "_blank",
              )
            }
          >
            GitHub
          </button>
          <button
            className="text-slate-400 hover:text-white transition-colors"
            onClick={() =>
              window.open(
                `${aboutData?.contact_details.linkedIn_url || "https://www.linkedin.com/in/hussnainali-dev/"}`,
                "_blank",
              )
            }
          >
            LinkedIn
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
