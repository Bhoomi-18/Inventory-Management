import Sidebar from "./sidebarContent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;