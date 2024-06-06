import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import useUserData from "@/hooks/useUserData";
import { Outlet } from "react-router-dom";

function App() {
  useUserData();
  return (
    <div className="flex min-h-svh w-full flex-col dark:bg-zinc-950 dark:text-zinc-50">
      <Sidebar />

      <Toaster />

      <div className="flex flex-col min-h-screen sm:pl-14">
        <Header />

        <Outlet />

        <div className="flex-1"></div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
