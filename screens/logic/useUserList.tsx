import { useContext, useReducer } from "react";
import { UserContext } from "../../st-management/context-api/UserContext";
import { UserContextType, userType } from "../../types";

export const useUserList = () => {
  const userCtx = useContext(UserContext) as UserContextType;

  const initialState = {
    showModal: false as boolean,
  };

  const set_show_modal = (value: boolean) => ({
    type: "SHOW_MODAL",
    payload: value,
  });

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ) => {
    switch (type) {
      case "SHOW_MODAL":
        return { ...state, showModal: payload as boolean };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleShowModal = (value: boolean): void => {
    dispatch(set_show_modal(value));
  };

  const onSaveUser = (value: userType) => {
    userCtx.onSaveUser(value);
  };

  const onDeleteUser = (id: string) => {
    userCtx.onDeleteUser(id);
  };

  return {
    state,
    onSaveUser,
    onDeleteUser,
    handleShowModal,
  };
};
