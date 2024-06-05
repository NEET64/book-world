import { AlertCircle, Heart, Star } from "lucide-react";
import { Badge } from "./ui/badge";

const UserCard = ({ user }) => {
  return (
    <div className="p-1 w-full col-span-2 sm:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
      <div className="p-2 flex flex-col gap-3 w-full rounded-lg border relative dark:border-zinc-800">
        <div className="flex items-center gap-2 p-2 pb-4 border-b dark:border-zinc-800">
          <img
            className="w-16 h-16 rounded-full shadow-lg"
            src={`https://api.multiavatar.com/${user?._id}.svg`}
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
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="ml-auto">
              {user?.role}
            </Badge>
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
