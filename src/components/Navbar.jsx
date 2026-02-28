import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Plus, ChevronDown, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitial = () => {
    if (!user?.fullName) return "U";
    return user.fullName.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 border-b border-white/10 bg-[#0a0a0a]">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="text-yellow-400" />
          <h1 className="text-xl font-bold">TimeCapsule</h1>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-400 hover:text-white"
        >
          Dashboard
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/create")}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold flex items-center gap-2"
        >
          <Plus size={16} />
          New Capsule
        </button>

        {/* PROFILE DROPDOWN */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {/* Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
              {getInitial()}
            </div>

            <span className="text-sm text-gray-300">
              {user?.fullName}
            </span>

            <ChevronDown size={16} />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-[#141414] border border-white/10 rounded-lg shadow-lg">

              <button
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;