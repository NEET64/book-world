import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CollapsibleSidebar from "./CollapsibleSidebar";
import { ModeToggle } from "./mode-toggle";
import { useRecoilValue } from "recoil";
import { pageTitleAtom } from "@/atoms/meta";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const pageTitle = useRecoilValue(pageTitleAtom);
  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.key === 114 || (e.ctrlKey && e.key === "k")) {
        if (document.getElementById("search") !== document.activeElement) {
          e.preventDefault();
          console.log("Search is not in focus");
          document.getElementById("search").focus();
        } else {
          console.log("Default action of CtrlF");
          return true;
        }
      }
    });
  }, []);
  return (
    <header className="sticky top-0 py-2 bg-slate-100 z-30 flex h-14 items-center gap-2 border-b border-slate-200 px-4 sm:h-auto sm:border-b sm:px-6 sm:bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <CollapsibleSidebar />

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight transition-colors hidden sm:flex dark:text-zinc-50">
        {pageTitle}
      </h1>

      <form
        className="relative sm:ml-auto flex-1 sm:grow-0 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/books?q=${search}`);
        }}>
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 dark:text-zinc-50" />
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-10 pr-14 sm:w-[200px] lg:w-[336px]"
          onChange={(e) => {
            setSearch(e.target.value.trim());
          }}
        />
        <span className="hidden sm:flex absolute right-24">
          <kbd className="pointer-events-none border-slate-200 inline-flex h-6 select-none items-center gap-1 rounded border my-2 px-2 text-[15px] font-medium opacity-100 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-800 ">
            <span className="text-xs">⌘</span>K
          </kbd>
        </span>
        <Button variant="outline">Search</Button>
      </form>
      <div className="flex items-center justify-center ">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
