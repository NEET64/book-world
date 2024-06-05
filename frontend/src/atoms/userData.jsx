import { atom } from "recoil";

export const userRoleAtom = atom({
  key: "userRole",
  default: "",
});

export const userIdAtom = atom({
  key: "userId",
  default: "",
});

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: !!localStorage.getItem("token"),
});

export const usersFavouriteBooksAtom = atom({
  key: "usersFavouriteBooks",
  default: [],
});

export const likedReviewsAtom = atom({
  key: "likedReviews",
  default: [],
});

export const likedCommentsAtom = atom({
  key: "likedComments",
  default: [],
});

export const isUserLoadingAtom = atom({
  key: "isUserLoading",
  default: true,
});
