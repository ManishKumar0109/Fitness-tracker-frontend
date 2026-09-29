import { Link, useLocation } from "react-router-dom";
import {
  House,
  Utensils,
  Activity,
  UserRound,
  Sun,
  PersonStanding,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: House },
    { name: "Food", path: "/foodlog", icon: Utensils },
    { name: "Activity", path: "/activitylog", icon: Activity },
    { name: "Profile", path: "/profile", icon: UserRound },
  ];

  return (
    <div className="w-full h-18 md:h-screen md:relative z-9999 absolute md:w-[20%] bg-[#0f172a] px-2 py-2 md:py-8 flex flex-row md:flex-col shrink-0">

      {/* Logo */}
      <div className="hidden md:flex items-center gap-3 px-3 mb-8">
        <div className="bg-emerald-500 rounded-xl p-2 text-white">
          <PersonStanding size={28} />
        </div>

        <p className="text-2xl font-bold text-white">FitTrack</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-row md:flex-col gap-1 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex-1 md:flex-none flex flex-col md:flex-row items-center gap-1 md:gap-4 justify-center md:justify-start px-2 md:px-4 py-2 md:py-3 font-medium transition ${
                isActive
                  ? "text-emerald-400 bg-[#0b2530] md:border-l-2 border-emerald-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs md:text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Light Mode */}
      <div className="hidden md:block mt-auto border-t border-slate-800 pt-5">
        <button className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white transition">
          <Sun size={21} />
          <span>Light Mode</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;