import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />

      <Toaster />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default App;
