import { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API calls
import { useRouteLoaderData } from "react-router-dom";

const useUserData = () => {
  const [userData, setUserData] = useState({
    role: "",
    token: "",
    isLoggedIn: false,
    usersFavouriteBooks: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const isFavouriteBook = (bookId) => {
    return userData.usersFavouriteBooks.some((book) => book.id === bookId);
  };

  useEffect(() => {
    console.log("fetch");
    axios
      .get("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        setUserData({
          role: response.data.user.role,
          token: localStorage.getItem("token"),
          isLoggedIn: true,
          usersFavouriteBooks: response.data.user.favouriteBooks || [],
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
