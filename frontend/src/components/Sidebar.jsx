import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  User2,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInAtom, userIdAtom, userRoleAtom } from "@/atoms/userData";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const role = useRecoilValue(userRoleAtom);
  const userId = useRecoilValue(userIdAtom);
  const navigate = useNavigate();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r sm:flex dark:bg-zinc-950 dark:border-zinc-800">
      <nav className="flex flex-col items-center gap-2">
        <div className="border-b p-2 w-full dark:border-zinc-800">
          {isLoggedIn ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink to={"users/" + userId} className="pb-0">
                    <img
                      className="w-10 h-10 rounded-full shadow-lg"
                      src={`https://api.multiavatar.com/${userId}.svg`}
                      alt="user"
                    />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{role}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              to="books"
              className="flex items-center justify-center gap-2 rounded-full bg-zinc-500 text-zinc-50 text-lg font-semibold h-10 w-10 dark:bg-zinc-600">
              <BookOpen size={20} />
              <span className="sr-only">Acme Inc</span>
            </Link>
          )}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="books"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center justify-center rounded-lg h-10 w-10 hover:bg-zinc-300 transition-colors bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50"
                    : "flex items-center justify-center rounded-lg h-10 w-10 border border-zinc-300 hover:bg-zinc-300 transition-colors bg-white dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }>
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="favourites"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center justify-center rounded-lg h-10 w-10 hover:bg-zinc-300 transition-colors bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50"
                    : "flex items-center justify-center rounded-lg h-10 w-10 border border-zinc-300 hover:bg-zinc-300 transition-colors bg-white dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                }>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favourites</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Favourites</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {role === "admin" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-center rounded-lg h-10 w-10 hover:bg-zinc-300 transition-colors bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50"
                      : "flex items-center justify-center rounded-lg h-10 w-10 border border-zinc-300 hover:bg-zinc-300 transition-colors bg-white dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  }>
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 border-t dark:border-zinc-800 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isLoggedIn ? (
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                  }}
                  className="flex items-center justify-center rounded-lg h-10 w-10 border border-zinc-300 bg-white hover:bg-zinc-300 transition-colors dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                  <LogOut className="h-5 w-5 text-zinc-950 dark:text-zinc-50" />
                  <span className="sr-only">Log Out</span>
                </span>
              ) : (
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="flex items-center justify-center rounded-lg h-10 w-10 border border-zinc-300 bg-white hover:bg-zinc-300 transition-colors dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                  <LogIn className="h-5 w-5 text-zinc-950 dark:text-zinc-50" />
                  <span className="sr-only">Log In</span>
                </span>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">
              {isLoggedIn ? "Log Out" : "Log In"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
