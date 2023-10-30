import React, { createContext, useReducer } from "react";
import { UserContextType, userType } from "../../types/user_type";

export const UserContext = createContext<UserContextType | null>(null);

interface IUserProvider {
  children: React.ReactNode;
}

export const UserProvider = (props: IUserProvider) => {
  const initialState = {
    users: [] as userType[],
  };

  const set_users = (value: userType[]) => ({ type: "USERS", payload: value });

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ) => {
    switch (type) {
      case "USERS":
        return { ...state, users: payload as userType[] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSaveUser = (value: userType) => {
    let newData: userType[] = [...state.users];
    newData.push(value);

    dispatch(set_users(newData));
  };

  const onDeleteUser = (id: string) => {
    let newData = state.users.filter((el: userType) => el.id !== id);
    dispatch(set_users(newData));
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        onSaveUser: onSaveUser,
        onDeleteUser: onDeleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
