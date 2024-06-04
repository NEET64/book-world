import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CollapsibleSidebar from "./CollapsibleSidebar";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 py-2 bg-gray-200 z-30 flex h-14 items-center gap-2 border-b px-4 sm:h-auto sm:border-b sm:px-6 sm:bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <CollapsibleSidebar />

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight transition-colors hidden sm:flex dark:text-zinc-50">
        The Book World
      </h1>

      <form
        className="relative sm:ml-auto flex-1 sm:grow-0 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/books?q=${search}`);
        }}>
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 dark:text-zinc-50" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-10 sm:w-[200px] lg:w-[336px]"
          onChange={(e) => {
            setSearch(e.target.value.trim());
          }}
        />
        <Button variant="outline">Search</Button>
      </form>
      <div className="flex items-center justify-center ">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
