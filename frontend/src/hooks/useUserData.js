import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userData, setUserData] = useState({
    role: "",
    userId: "",
    isLoggedIn: !!localStorage.getItem("token"),
    usersFavouriteBooks: [],
    likedReviews: [],
    likedComments: [],
  });

  const isFavouriteBook = (bookId) => {
    return userData.usersFavouriteBooks.includes(bookId);
  };

  const isLikedReview = (reviewId) => {
    return userData.likedReviews.includes(reviewId);
  };

  const isLikedComment = (commentId) => {
    return userData.likedComments.includes(commentId);
  };
  useEffect(() => {
    userData.isLoggedIn &&
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserData({
            role: response.data.user.role,
            userId: response.data.user._id,
            isLoggedIn: true,
            likedReviews: response.data.user.likedReviews || [],
            likedComments: response.data.user.likedComments || [],
            usersFavouriteBooks: response.data.user.favoriteBooks || [],
          });
        })
        .catch((error) =>
          setUserData({
            role: "",
            userId: "",
            isLoggedIn: !!localStorage.getItem("token"),
            usersFavouriteBooks: [],
            likedReviews: [],
            likedComments: [],
          })
        )
        .finally(() => setIsUserLoading(false));
  }, [isUserLoading]);

  return {
    ...userData,
    isFavouriteBook,
    setUserData,
    isLikedReview,
    isLikedComment,
    isUserLoading,
    setIsUserLoading,
  };
};

export default useUserData;
