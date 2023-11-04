import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../../types";

const initialState = {
  users: [] as userType[],
};

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    onSaveUser: (state, { payload }: PayloadAction<{ value: userType }>) => {
      state.users.push(payload.value);
    },
    onDeleteUser: (state, { payload }: PayloadAction<{ id: string }>) => {
      let filteredData = state.users.filter((el) => el.id !== payload.id);
      state.users = filteredData;
    },
    undoDeletedUser: (
      state,
      { payload }: PayloadAction<{ index: number; value: userType }>
    ) => {
      let newUsers = [...state.users];
      newUsers.splice(payload.index, 0, payload.value);

      state.users = newUsers;
    },
  },
});

export const { onSaveUser, onDeleteUser, undoDeletedUser } =
  userReducer.actions;
export default userReducer.reducer;
