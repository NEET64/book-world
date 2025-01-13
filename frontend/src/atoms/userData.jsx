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
  key: "userAvatar",
  default: "",
});

export const userAvatarSelector = selector({
  key: "userAvatarImage",
  get: ({ get }) => {
    const userId = get(userIdAtom);
    const avatar = get(userAvatarAtom);
    return avatar || `https://api.multiavatar.com/${userId}.svg`;
  },
  set: ({ set, get }, newValue) => {
    const userId = get(userIdAtom);
    if (newValue === "") {
      set(userAvatarAtom, `https://api.multiavatar.com/${userId}.svg`);
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
