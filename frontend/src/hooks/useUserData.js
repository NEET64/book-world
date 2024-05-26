import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {
  const [userData, setUserData] = useState({
    role: "",
    token: "",
    isLoggedIn: false,
    usersFavouriteBooks: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const isFavouriteBook = (bookId) => {
    return userData.usersFavouriteBooks.includes(bookId);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        setUserData({
          role: response.data.user.role,
          token: localStorage.getItem("token"),
          isLoggedIn: true,
          usersFavouriteBooks: response.data.user.favoriteBooks || [],
        })
      )
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUserData({
          role: "",
          token: "",
          isLoggedIn: false,
          usersFavouriteBooks: [],
        });
      })
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  return { ...userData, isFavouriteBook, isLoading, setUserData, setIsLoading };
};

export default useUserData;
