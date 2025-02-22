import NotFound from "@/pages/NotFound";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { AlertCircle, Heart, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { pageTitleAtom } from "@/atoms/meta";
import { toast } from "sonner";
import multiavatar from "@multiavatar/multiavatar";

const UserDetails = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();
  const svgCode = multiavatar(userId);
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgCode)}`;
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  useEffect(() => setPageTitle("User Profile"), []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto my-5 flex p-4 w-full flex-1 items-center flex-grow col-span-2 max-w-xl text-center">
      <div className="p-2 flex flex-col gap-3 w-full h-fit rounded-lg border relative border-slate-200 dark:border-zinc-800">
        <div className="flex flex-col text-center items-center justify-center gap-4 px-auto py-10 border-b border-slate-200 dark:border-zinc-800">
          <img
            className="absolute w-32 h-32 -top-20 rounded-full shadow-lg p-3 border-2 bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-800"
            src={user.picture || svgBase64}
            alt="user"
          />
          <div className="flex flex-col justify-center">
            <h5
              title={user?.firstName + " " + user?.lastName}
              className="w-full truncate mb-1 text-3xl sm:text-4xl font-medium text-gray-900 dark:text-zinc-50">
              {user?.firstName} {user?.lastName}
            </h5>
            <span
              title={user?.email}
              className="w-full truncate text-2xl sm:text-3xl text-gray-500">
              {user?.email}
            </span>
          </div>
          <div className="">
            <Badge variant="outline" className="ml-auto text-lg">
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

export default UserDetails;
