import multiavatar from "@multiavatar/multiavatar";
import { atom, selector } from "recoil";

export const userRoleAtom = atom({
  key: "userRole",
  default: "",
});

export const userIdAtom = atom({
  key: "userId",
  default: "",
});

export const userAvatarAtom = atom({
  key: "userAvatarAtom",
  default: selector({
    key: "userAvatarDefault",
    get: ({ get }) => {
      const userId = get(userIdAtom);
      const svgCode = multiavatar(userId);
      return `data:image/svg+xml;base64,${btoa(svgCode)}`;
    },
  }),
});

export const userAvatarSelector = selector({
  key: "userAvatarSelector",
  get: ({ get }) => {
    return get(userAvatarAtom);
  },
  set: ({ set, get }, newValue) => {
    if (!newValue) {
      const userId = get(userIdAtom);
      const svgCode = multiavatar(userId);
      const defaultAvatar = `data:image/svg+xml;base64,${btoa(svgCode)}`;
      set(userAvatarAtom, defaultAvatar);
    } else {
      set(userAvatarAtom, newValue);
    }
  },
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
  default: false,
});
