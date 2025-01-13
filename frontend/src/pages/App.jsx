import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useUserData from "@/hooks/useUserData";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useUserData();
  useEffect(() => {
    const logVisit = async () => {
      const userAgent = navigator.userAgent;
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

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      let promise = axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/google-auth`,
        {
          token: credentialResponse.credential,
          auth_method: "google",
        }
      );
      toast.promise(promise, {
        loading: "Loading...",
        success: (response) => {
          const { token } = response.data;
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          return response.data.message;
        },
        error: (error) => error.response.data.message,
      });
    },
    auto_select: true,
    disabled: isLoggedIn,
  });

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
