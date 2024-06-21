import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { useSetRecoilState } from "recoil";
import { pageTitleAtom } from "@/atoms/meta";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  const [counter, setCounter] = useState(0);
  useEffect(() => setPageTitle("All Users"), []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data.users))
      .catch((error) => toast.error(error.response.data.message))
      .finally(setIsLoading(false));
  }, [counter]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="grid flex-1 items-start p-2 sm:p-4">
      {users ? (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap">
          {users?.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              handleReload={() => setCounter(counter + 1)}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
              401
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900">
              Not Authorized
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Users;
