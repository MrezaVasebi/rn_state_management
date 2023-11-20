import React, { createContext, useReducer } from "react";
import { UserContextType, userType } from "../../types/user_type";

export const UserContext = createContext<UserContextType | null>(null);

interface IUserProvider {
  children: React.ReactNode;
}

export const UserProvider = (props: IUserProvider) => {
  const initialState = {
    users: [] as userType[],
    copiedUsers: [] as userType[],
  };

  const set_users = (value: userType[]) => ({ type: "USERS", payload: value });
  const set_copied_users = (value: userType[]) => ({
    type: "COPIED_USERS",
    payload: value,
  });

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ) => {
    switch (type) {
      case "COPIED_USERS":
        return { ...state, copiedUsers: payload as userType[] };
      case "USERS":
        return { ...state, users: payload as userType[] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSaveUser = (value: userType) => {
    let newData: userType[] = [...state.copiedUsers];
    newData.push(value);

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  const onDeleteUser = (id: string) => {
    let newData = state.copiedUsers.filter((el: userType) => el.id !== id);

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  const undoDeletedUser = (index: number, user: userType) => {
    let newData = [...state.copiedUsers];
    newData.splice(index, 0, user); // adding item to specific index in array

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  const onFilterByGender = (type: string) => {
    if (type === "all") dispatch(set_copied_users(state.users));
    if (type === "male") {
      let res = state.users.filter((el) => el.gender === type);
      dispatch(set_copied_users(res.length === 0 ? state.users : res));
    }
    if (type === "female") {
      let res = state.users.filter((el) => el.gender === type);
      dispatch(set_copied_users(res.length === 0 ? state.users : res));
    }
  };

  const onEditUser = (value: userType) => {
    // deleting existed user
    let newOne = [...state.copiedUsers];
    let index = newOne.findIndex((el) => el.id === value.id);
    newOne.splice(index, 1);

    newOne.push(value);
    dispatch(set_users(newOne));
    dispatch(set_copied_users(newOne));
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        onSaveUser: onSaveUser,
        onEditUser: onEditUser,
        onDeleteUser: onDeleteUser,
        copiedUsers: state.copiedUsers,
        undoDeletedUser: undoDeletedUser,
        onFilterByGender: onFilterByGender,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
