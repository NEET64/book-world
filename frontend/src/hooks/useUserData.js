import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isLoggedInAtom,
  isUserLoadingAtom,
  likedCommentsAtom,
  likedReviewsAtom,
  userIdAtom,
  userRoleAtom,
  usersFavouriteBooksAtom,
} from "@/atoms/userData";

const useUserData = () => {
  const setUserRole = useSetRecoilState(userRoleAtom);
  const setUserId = useSetRecoilState(userIdAtom);
  const setUsersFavouriteBooks = useSetRecoilState(usersFavouriteBooksAtom);
  const setLikedReviews = useSetRecoilState(likedReviewsAtom);
  const setLikedComments = useSetRecoilState(likedCommentsAtom);
  const setIsUserLoading = useSetRecoilState(isUserLoadingAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const fetchUser = async () => {
    setIsUserLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserRole(response.data.user.role);
        setUserId(response.data.user._id);
        setIsLoggedIn(true);
        setUsersFavouriteBooks(response.data.user.favoriteBooks || []);
        setLikedReviews(response.data.user.likedReviews || []);
        setLikedComments(response.data.user.likedComments || []);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsUserLoading(false));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUserRole("");
      setUserId("");
      setUsersFavouriteBooks([]);
      setLikedReviews([]);
      setLikedComments([]);
      return;
    }
    fetchUser();
  }, [isLoggedIn]);
};

export default useUserData;
