"use client";

import { Search, Menu } from "lucide-react";
import { useSidebar } from "./sidebar";

export default function Header() {
  const { setIsOpen } = useSidebar();

  return (
    <header className="h-16 border-b border-[#3e342b] bg-[#1a140e]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-10 gap-4">

      {/* Left: Hamburger Menu (mobile only) + Search Bar */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-[#231910] border border-[#3e342b] text-white hover:bg-[#2a221b] transition-all flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-[#9a6c4c]" size={16} />
          </div>
          <input
            className="w-full bg-[#120d0a] border border-[#3e342b] text-white text-xs rounded-lg focus:outline-none focus:border-[#ec6d13] block pl-9 p-2.5 placeholder-[#9a6c4c]"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>

      {/* Right: User Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Avatar */}
        <div className="h-8 w-8 bg-[#2c241b] rounded-full border border-[#3e342b] overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-[#ec6d13]" />
        </div>
      </div>
    </header>
  );
}