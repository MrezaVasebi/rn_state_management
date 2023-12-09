import { atom, selector } from "recoil";
import { invokeApi } from "../../hooks";
import { userType } from "../../types";
import { type_user } from "../../types/api";

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

export const loadingState = atom({
  key: "stateLoading",
  default: false as boolean,
});

export const usersListState = atom({
  key: "stateUsersList",
  default: [] as type_user[],
});

export const onFetchUsersList = selector({
  key: "listOnFetchUsers",
  get: async () => {
    let response = await invokeApi<type_user[]>("users");
    if (response === undefined || typeof response === "string") {
      return [] as type_user[];
    } else {
      return response;
    }
  },
});
