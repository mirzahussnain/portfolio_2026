

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-glass-border bg-background-dark/50 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="size-6 bg-primary/20 rounded flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[16px]">
              terminal
            </span>
          </div>
          <span className="text-white font-bold tracking-tight">
            DevPortfolio
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2024 Hussnain Ali. Built with React & Tailwind.
        </p>
        <div className="flex gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            Twitter
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            GitHub
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            LinkedIn
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
