import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../types";

type initType = {
  users: userType[];
  filteredType: string;
  copiedUsers: userType[];
};

const initialState: initType = {
  filteredType: "all",
  users: [] as userType[],
  copiedUsers: [] as userType[],
};

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    onSaveUser: (state, { payload }: PayloadAction<{ value: userType }>) => {
      state.users.push(payload.value);
      state.copiedUsers.push(payload.value);
    },
    onDeleteUser: (state, { payload }: PayloadAction<{ id: string }>) => {
      let filteredData = state.users.filter((el) => el.id !== payload.id);
      state.users = filteredData;
      state.copiedUsers = filteredData;
    },
    undoDeletedUser: (
      state,
      { payload }: PayloadAction<{ index: number; value: userType }>
    ) => {
      let newUsers = [...state.users];
      newUsers.splice(payload.index, 0, payload.value);

      state.users = newUsers;
      state.copiedUsers = newUsers;
    },
    onEditUser: (state, { payload }: PayloadAction<{ value: userType }>) => {
      // deleting existed user
      let newOne = [...state.users];
      let index = newOne.findIndex((el) => el.id === payload.value.id);
      newOne.splice(index, 1);

      // adding edited one
      newOne.push(payload.value);
      state.users = newOne;
      state.copiedUsers = newOne;
    },
    onFilterUser: (state, { payload }: PayloadAction<{ type: string }>) => {
      if (payload.type === "all") state.copiedUsers = state.users;
      else if (payload.type === "male") {
        let res = state.users.filter((el) => el.gender === payload.type);
        state.copiedUsers = res.length === 0 ? state.users : res;
      } else if (payload.type === "female") {
        let res = state.users.filter((el) => el.gender === payload.type);
        state.copiedUsers = res.length === 0 ? state.users : res;
      }
    },
  },
});

export const {
  onSaveUser,
  onDeleteUser,
  undoDeletedUser,
  onEditUser,
  onFilterUser,
} = userReducer.actions;
export default userReducer.reducer;
