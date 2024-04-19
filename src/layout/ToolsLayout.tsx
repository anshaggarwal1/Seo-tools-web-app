import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const ToolsLayout = () => {
  return (
    <div className=" relative container flex  overflow-hidden">
      <Sidebar />
      <main className="w-full pt-8 lg:pl-72">
        <Outlet />
      </main>
    </div>
  );
};

export default ToolsLayout;
