import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function UserMenu(){
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  

  const handleDashboard = () => {
    router.push("/yourlist");
    setIsOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      signOut();
    }
    setIsOpen(false);
  }


  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => { setIsOpen(!isOpen) }}
        className="px-8 py-3 rounded font-semibold text-white 
                      bg-gray-600 
                      hover:bg-gray-700
                      shadow-lg hover:shadow-xl 
                      transition-all duration-200 
                      hover:scale-[1.02] active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <div className="flex items-center justify-center">
            <span className="opacity-0">T</span>
            <div className="absolute space-y-1">
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
            </div>
            </div>
      </button>

  {/* Dropdown */}
  <div className={`absolute bottom-full mb-3 w-52 
                bg-gray-800 backdrop-blur-md 
                rounded shadow-lg overflow-hidden 
                border border-gray-700/40 z-10
                transform origin-bottom transition-all duration-200
                ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
  >
    <div
     onClick={handleDashboard}
     className="px-4 py-2.5 cursor-pointer text-sm transition-all text-gray-200 hover:bg-gray-700/70 hover:text-white">
      Dashboard
    </div>
    <div
     onClick={handleLogout}
     className="px-4 py-2.5 cursor-pointer text-sm transition-all text-gray-200 hover:bg-gray-700/70 hover:text-white">
      Logout
    </div>

  </div>


    </div>
  );
}


