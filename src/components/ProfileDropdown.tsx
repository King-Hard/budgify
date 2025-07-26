// components/ProfileDropdown.tsx
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/controllers/authentication";

export default function ProfileDropdown({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const initial = email.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-medium transition-all"
        >
          {initial}
        </button>
      </div>
      
      {isOpen && (
        <div 
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
        >
          <div className="px-4 py-2 border-b" role="none">
            <p className="text-sm font-medium truncate" role="status">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            role="menuitem"
            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}