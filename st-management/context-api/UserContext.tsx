import React, { createContext, useReducer } from "react";
import { type_user } from "../../types/api";
import { UserContextType, userType } from "../../types/user_type";

export const UserContext = createContext<UserContextType | null>(null);

interface IUserProvider {
  children: React.ReactNode;
}

export const UserProvider = (props: IUserProvider) => {
  const initialState = {
    users: [] as userType[],
    copiedUsers: [] as userType[],

    usersList: [] as type_user[],
  };

  const set_users = (value: userType[]) => ({ type: "USERS", payload: value });

  const set_users_list = (value: type_user[]) => ({
    type: "USERS_LIST",
    payload: value,
  });

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
      case "USERS_LIST":
        return { ...state, usersList: payload as type_user[] };
      case "USERS":
        return { ...state, users: payload as userType[] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // save user
  const onSaveUser = (value: userType) => {
    let newData: userType[] = [...state.copiedUsers];
    newData.push(value);

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  // delete user
  const onDeleteUser = (id: string) => {
    let newData = state.copiedUsers.filter((el: userType) => el.id !== id);

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  // undo delete user
  const undoDeletedUser = (index: number, user: userType) => {
    let newData = [...state.copiedUsers];
    newData.splice(index, 0, user); // adding item to specific index in array

    dispatch(set_users(newData));
    dispatch(set_copied_users(newData));
  };

  // filter user by gender
  const onFilterByGender = (type: string) => {
    if (type === "all") dispatch(set_copied_users(state.users));
    else if (type === "male" || type === "female") {
      let res = state.users.filter((el) => el.gender === type);
      dispatch(set_copied_users(res.length === 0 ? state.users : res));
    }
  };

  // edit user
  const onEditUser = (value: userType) => {
    // deleting existed user
    let newOne = [...state.copiedUsers];
    let index = newOne.findIndex((el) => el.id === value.id);
    newOne.splice(index, 1);

    newOne.push(value);
    dispatch(set_users(newOne));
    dispatch(set_copied_users(newOne));
  };

  // save users list
  const onSaveUsersList = (value: type_user[]) => {
    dispatch(set_users_list(value));
  };

  return (
    <UserContext.Provider
      value={{
        usersList: state.usersList, // api
        onSaveUsersList: onSaveUsersList, // api

        users: state.users, // local
        copiedUsers: state.copiedUsers, // local

        onSaveUser: onSaveUser,
        onEditUser: onEditUser,
        onDeleteUser: onDeleteUser,
        undoDeletedUser: undoDeletedUser,
        onFilterByGender: onFilterByGender,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
