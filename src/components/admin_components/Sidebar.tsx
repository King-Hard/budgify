import NavLink from "../Navigation";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-gray-100">
      <div className="p-3 text-center border border-black">
        <h1 className="text-xl sm:text-2xl font-medium">BUDGIFY</h1>
      </div>
      <div className="w-45 sm:w-60 h-[100vh] pt-12 border border-black">
        <NavLink 
          label={"Dashboard"}
          href="/admin/dashboard"
        />      
        <NavLink 
          label={"Add Budget"}
          href="/admin/add_budget"
        />
        <NavLink
          label={"Goal Tracker"} 
          href="/admin/goal_tracker"
        />
        <NavLink 
          label={"Bill Reminder"}
          href="/admin/bill_reminder"
        />
      </div>
    </div>
  );
};