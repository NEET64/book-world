import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useUserData from "@/hooks/useUserData";
import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useUserData();
  useEffect(() => {
    const logVisit = async () => {
      const userAgent = navigator.userAgent;
      if (!localStorage.getItem("hasVisited")) {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/log-visit`, {
          userAgent,
        });
        localStorage.setItem("hasVisited", "true");
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/log-visit`, {
          userAgent,
        });
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/log-visit`,
        {
          userAgent,
        }
      );
      console.log(`Total unique visitors: ${data.totalVisitors}.`);
      console.log(`You have visited ${data.totalVisits} time(s).`);
    };
    logVisit();
  }, []);
  return (
    <div className="flex min-h-dvh w-full flex-col dark:bg-zinc-950 dark:text-zinc-50">
      <Sidebar />

      <div className="flex flex-col min-h-dvh sm:pl-14">
        <Header />

        <Outlet />

        <div className="flex-1"></div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
