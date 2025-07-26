import Sidebar from "@/components/admin_components/Sidebar";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/configs/session";
import ProfileDropdown from "@/components/ProfileDropdown";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = (await cookies()).get("session")?.value;
  let email = "";

  if (session) {
    const decrypted = await decrypt(session);
    email= decrypted?.email || "";
  };

  return (
    <div className="flex">  
      <Sidebar/>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full py-1.5 sm:py-2 px-6 sm:px-12 max-h-[60px] border">
          <h1 className="text-lg sm:text-xl font-medium">Admin Panel</h1>
          {email ? (
            <ProfileDropdown email={email} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          )}
        </div>
        {children}
      </div>
      <div>
        <div>
          
        </div>
      </div>
    </div>
  );
}