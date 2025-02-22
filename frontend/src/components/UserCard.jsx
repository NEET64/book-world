import { AlertCircle, Heart, Loader2, MoreVertical, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import multiavatar from "@multiavatar/multiavatar";

const UserCard = ({ user, handleReload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const svgCode = multiavatar(user._id);
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgCode)}`;
  if (user.picture) console.log(user);

  const handlePromotion = async () => {
    setIsLoading(true);
    let promise = axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user._id}/promote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        handleReload();
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div className="p-1 w-full col-span-2 sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
      <div className="p-2 flex flex-col gap-3 w-full rounded-lg border relative border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 p-2 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <img
            className="w-16 h-16 rounded-full shadow-lg"
            src={user.picture || svgBase64}
            alt="user"
          />
          <div className="flex flex-col text-left">
            <h5
              title={user?.firstName + " " + user?.lastName}
              className="w-36 truncate mb-1 text-xl font-medium text-gray-900 dark:text-zinc-50">
              {user?.firstName} {user?.lastName}
            </h5>
            <span
              title={user?.email}
              className="w-40 truncate text-sm text-gray-500">
              {user?.email}
            </span>
          </div>
          <div className="absolute right-4 top-4 flex items-center">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Badge
                variant={user?.role == "admin" ? "default" : "outline"}
                title={user?.role == "admin" ? "Demote User" : "Promote User"}
                className="m-1">
                {user?.role}
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <span className="m-2">
                  {user?.role == "admin" ? "Admin" : "User"}
                </span>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePromotion}>
                  {user?.role == "admin" ? "Demote User" : "Promote User"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-3 dark:text-zinc-50/60">
          <div className="flex flex-col items-center">
            <span className="flex gap-1 items-center justify-center text-base">
              <span>
                {user?.likedComments?.length + user?.likedReviews?.length}
              </span>
              <Heart size={18} />
            </span>
            <span>Likes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex gap-1 items-center justify-center text-base">
              <span>{user?.reportedBy?.length}</span> <AlertCircle size={18} />
            </span>
            <span>Reports</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex gap-1 items-center justify-center text-base">
              <span>{user?.favoriteBooks?.length}</span> <Star size={18} />
            </span>
            <span>Favourites</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
