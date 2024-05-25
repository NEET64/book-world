import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { Input } from "@/components/ui/input";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-gray-200 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6 sm:bg-transparent">
      <CollapsibleSidebar />

      <h1 className="text-3xl font-semibold tracking-tight transition-colors hidden sm:flex">
        The Book World
      </h1>

      <form
        className="relative ml-auto flex-1 sm:grow-0 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/books?q=${search}`);
        }}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[336px]"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant="outline">Search</Button>
      </form>
    </header>
  );
};

export default App;
