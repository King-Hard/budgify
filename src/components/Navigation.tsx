"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLink({ label, href }) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={`mt-1 relative flex items-center pl-3 sm:pl-6 pr-3 sm:pr-6 py-3 text-base sm:text-lg font-medium hover:text-black hover:bg-gray-200 transition-colors rounded-md 
      ${isActive ? "bg-gray-200" : ""}`}
    >
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1.5 bg-black rounded-r"/>
      )}
      <span className={`${isActive ? "text-black font-semibold" : ""}`}>
        {label}
      </span>
    </Link>
  );
}
