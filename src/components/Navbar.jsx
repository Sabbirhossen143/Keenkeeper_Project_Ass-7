import { NavLink } from "react-router-dom";
import { FaHome, FaClock, FaChartBar } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 lg:px-16 py-3 shadow bg-white gap-3 md:gap-0">

      {/* Logo */}
      <img src="/logo.png" className="h-10 w-auto" />

      {/* Nav Links */}
      <div className="flex gap-4">

        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-md transition 
            ${isActive
              ? "bg-[#244D3F] text-white"
              : "text-gray-600 hover:bg-green-200 hover:text-[#244D3F]"}`
          }
        >
          <FaHome />
          Home
        </NavLink>

        {/* Timeline */}
        <NavLink
          to="/timeline"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-md transition 
            ${isActive
              ? "bg-[#244D3F] text-white"
              : "text-gray-600 hover:bg-green-200 hover:text-[#244D3F]"}`
          }
        >
          <FaClock />
          Timeline
        </NavLink>

        {/* Stats */}
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-md transition 
            ${isActive
              ? "bg-[#244D3F] text-white"
              : "text-gray-600 hover:bg-green-200 hover:text-[#244D3F]"}`
          }
        >
          <FaChartBar />
          Stats
        </NavLink>

      </div>
    </nav>
  );
}