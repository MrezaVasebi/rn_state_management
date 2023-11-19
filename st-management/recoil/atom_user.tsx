import { atom, selector } from "recoil";
import { userType } from "../../types";

export const usersState = atom<userType[]>({
  key: "users",
  default: [] as userType[],
});

export const usersCount = selector({
  key: "usersLength",
  get: ({ get }) => {
    return get(usersState).length;
  },
});
