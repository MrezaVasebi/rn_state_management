import { atom, selector } from "recoil";
import { userType } from "../../types";

export const usersState = atom<userType[]>({
  key: "stateUsers",
  default: [] as userType[],
});

export const usersCount = selector({
  key: "countUsers",
  get: ({ get }) => {
    return get(usersState).length;
  },
});

export const userFilterState = atom({
  key: "stateFilterUser",
  default: "all",
});

export const filteredUsers = selector({
  key: "usersFiltered",
  get: ({ get }) => {
    let users = get(usersState);
    let type: string = get(userFilterState);

    switch (type) {
      case "all":
        return users;
      case "male":
      case "female": {
        let res = users.filter((el) => el.gender === type);
        if (res.length !== 0) return res;
        else return users;
      }
      default:
        return users;
    }
  },
});
