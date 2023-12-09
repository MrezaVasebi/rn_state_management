import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invokeApi } from "../../hooks";
import { userType } from "../../types";
import { type_user } from "../../types/api";

type initType = {
  loading: boolean; // api
  usersList: type_user[]; // api

  users: userType[]; // local
  filteredType: string;
  copiedUsers: userType[];
};

const initialState: initType = {
  loading: false, // api
  usersList: [] as type_user[],

  filteredType: "all",
  users: [] as userType[],
  copiedUsers: [] as userType[],
};

/* createAsyncThunk is called with two arguments.
The first argument is a string “get/usersList”, which represents the name of the thunk action.
This name will be used to generate action types for the pending, fulfilled, and rejected states of the asynchronous operation.
The second argument is an asynchronous function that will be executed when the thunk action is dispatched. */

// fetch users list
export const onFetchUsersList = createAsyncThunk("get/usersList", async () => {
  let response = await invokeApi<type_user[]>("users");
  if (response == undefined || typeof response === "string") {
    return [] as type_user[];
  } else {
    return response;
  }
});

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
      else if (payload.type === "male" || payload.type === "female") {
        let res = state.users.filter((el) => el.gender === payload.type);
        state.copiedUsers = res.length === 0 ? state.users : res;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onFetchUsersList.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(onFetchUsersList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.usersList = payload;
    });
    builder.addCase(onFetchUsersList.rejected, (state, { payload }) => {
      state.loading = false;
    });
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
