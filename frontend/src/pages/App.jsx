import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RecoilRoot>
        <div className="flex min-h-screen w-full flex-col dark:bg-zinc-950 dark:text-zinc-50">
          <Sidebar />

          <Toaster />

          <div className="flex flex-col sm:gap-4 sm:pl-14">
            <Header />

            <Outlet />
          </div>
        </div>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
