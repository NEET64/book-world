import { Link, NavLink, useNavigate } from "react-router-dom";

import { BookOpen, Heart, Home, LogIn, LogOut, Users2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, role } = useAuth();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r shadow-md bg-white sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="books"
          className="flex items-center justify-center gap-2 rounded-full bg-slate-500 text-white text-lg font-semibold sm:h-8 sm:w-8 sm:text-base">
          <BookOpen className="h-4 w-4" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="books"
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-300 flex h-9 w-9 items-center justify-center rounded-lg sm:h-8 sm:w-8"
                    : "flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-300 transition-colors sm:h-8 sm:w-8"
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
                    ? "bg-slate-300 flex h-9 w-9 items-center justify-center rounded-lg sm:h-8 sm:w-8"
                    : "flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-300 transition-colors sm:h-8 sm:w-8"
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
                      ? "bg-slate-300 flex h-9 w-9 items-center justify-center rounded-lg sm:h-8 sm:w-8"
                      : "flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-300 transition-colors sm:h-8 sm:w-8"
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
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isLoggedIn ? (
                <span
                  onClick={() => {
                    logout();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-300 transition-colors sm:h-8 sm:w-8">
                  <LogOut className="h-5 w-5 text-black" />
                  <span className="sr-only">Log Out</span>
                </span>
              ) : (
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-300 transition-colors sm:h-8 sm:w-8">
                  <LogIn className="h-5 w-5 text-black" />
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
