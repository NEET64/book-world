import BookCard from "@/components/BookCard";
import UserCard from "@/components/UserCard";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    token &&
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUsers(response.data.users))
        .catch((error) => console.error(error));
  }, [token]);
  return (
    <main className="grid flex-1 items-start p-2 sm:px-4 sm:py-0">
      {users.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Users;
