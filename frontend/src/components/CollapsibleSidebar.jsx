import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  Menu,
  User2,
  Users2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoggedInAtom,
  userAvatarAtom,
  userIdAtom,
  userRoleAtom,
} from "@/atoms/userData";
import { toast } from "sonner";
import { googleLogout } from "@react-oauth/google";

const CollapsibleSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const role = useRecoilValue(userRoleAtom);
  const userId = useRecoilValue(userIdAtom);
  const userAvatar = useRecoilValue(userAvatarAtom);

  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="min-w-fit sm:max-w-64 dark:border-zinc-800">
        <nav className="grid gap-6 text-lg font-medium">
          {isLoggedIn ? (
            <img
              className="w-10 h-10 rounded-full shadow-lg"
              src={userAvatar}
              alt="user"
            />
          ) : (
            <Link
              href="#"
              className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-400 text-slate-50 text-lg font-semibold sm:text-base">
              <BookOpen size={20} />
              <span className="sr-only">Book World</span>
            </Link>
          )}
          <NavLink
            to="books"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
            }>
            <Home size={20} />
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to={"users/" + userId}
              end
              className={({ isActive }) =>
                isActive
                  ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                  : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
              }>
              <User2 className="h-5 w-5" />
              User
            </NavLink>
          )}

          <NavLink
            to="favourites"
            className={({ isActive }) =>
              isActive
                ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
            }>
            <Heart className="h-5 w-5" />
            Favourites
          </NavLink>
          {role === "admin" && (
            <NavLink
              to="users"
              end
              className={({ isActive }) =>
                isActive
                  ? " flex items-center gap-4 px-2.5 text-slate-950 font-bold hover:text-zinc-950 dark:text-zinc-50"
                  : "flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400"
              }>
              <Users2 className="h-5 w-5" />
              Users
            </NavLink>
          )}
          {isLoggedIn ? (
            <Link
              onClick={() => {
                localStorage.removeItem("token");
                googleLogout();
                setIsLoggedIn(false);
                toast.success("Logged Out Successfully");
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400">
              <LogOut className="h-5 w-5" />
              Log Out
            </Link>
          ) : (
            <Link
              onClick={() => {
                navigate("/login");
              }}
              className="flex items-center gap-4 px-2.5 text-gray-600 hover:text-zinc-950 dark:hover:text-zinc-400">
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
