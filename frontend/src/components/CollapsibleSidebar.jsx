import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  Users2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";

const CollapsibleSidebar = () => {
  const { isLoggedIn, logout, role } = useAuth();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="min-w-fit sm:max-w-64">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-400 text-lg font-semibold sm:text-base">
            <BookOpen className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Book World</span>
          </Link>
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-black font-bold hover:text-black"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-black"
            }>
            <Home className="h-5 w-5" />
            Home
          </NavLink>
          <NavLink
            to="favourites"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-black font-bold hover:text-black"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-black"
            }>
            <Heart className="h-5 w-5" />
            Favourites
          </NavLink>
          {role === "admin" && (
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? " flex items-center gap-4 px-2.5 text-black font-bold hover:text-black"
                  : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-black"
              }>
              <Users2 className="h-5 w-5" />
              Users
            </NavLink>
          )}

          {isLoggedIn ? (
            <Link
              onClick={() => {
                logout();
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-black">
              <LogOut className="h-5 w-5" />
              Log Out
            </Link>
          ) : (
            <Link
              onClick={() => {
                navigate("/login");
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-black">
              <LogIn className="h-5 w-5" />
              Log In
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default CollapsibleSidebar;
