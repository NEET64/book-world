import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CollapsibleSidebar from "./CollapsibleSidebar";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 py-2 bg-gray-200 z-30 flex h-14 items-center gap-4 border-b px-4 sm:h-auto sm:border-0 sm:px-6 sm:bg-white sm:shadow-sm ">
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

export default Header;
