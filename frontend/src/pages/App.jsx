import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import useUserData from "@/hooks/useUserData";
import { Outlet } from "react-router-dom";

function App() {
  useUserData();
  return (
    <div className="flex min-h-screen w-full flex-col dark:bg-zinc-950 dark:text-zinc-50">
      <Sidebar />

      <Toaster />

      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default App;
