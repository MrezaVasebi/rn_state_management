import { useContext, useEffect, useReducer } from "react";
import { UserContext } from "../../st-management/context-api/UserContext";
import { UserContextType, userType } from "../../types";

export const useUserList = () => {
  const userCtx = useContext(UserContext) as UserContextType;

  const initialState = {
    showModal: false as boolean,
    showUndoScreen: false as boolean,
    deletedIndex: 0 as number,
    deletedUser: {} as userType,
  };

  const set_show_modal = (value: boolean) => ({
    type: "SHOW_MODAL",
    payload: value,
  });

  const set_show_undo_screen = (value: boolean) => ({
    type: "SHOW_UNDO_SCREEN",
    payload: value,
  });

  const set_deleted_index = (value: number) => ({
    type: "DELETED_INDEX",
    payload: value,
  });

  const set_deleted_user = (value: userType) => ({
    type: "DELETED_USER",
    payload: value,
  });

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ) => {
    switch (type) {
      case "DELETED_USER":
        return { ...state, deletedUser: payload as userType };
      case "DELETED_INDEX":
        return { ...state, deletedIndex: payload as number };
      case "SHOW_UNDO_SCREEN":
        return { ...state, showUndoScreen: payload as boolean };
      case "SHOW_MODAL":
        return { ...state, showModal: payload as boolean };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.showUndoScreen) {
      setTimeout(() => {
        dispatch(set_show_undo_screen(false));
      }, 2000);
    }
  }, [state.showUndoScreen]);

  const handleShowModal = (value: boolean): void => {
    dispatch(set_show_modal(value));
  };

  const onSaveUser = (value: userType) => {
    userCtx.onSaveUser(value);
  };

  const onDeleteUser = (id: string) => {
    // deleted index
    dispatch(set_deleted_index(userCtx.users.findIndex((el) => el.id === id)));

    // deleted user
    let deletedUser = userCtx.users.find((el) => el.id === id);
    if (deletedUser !== undefined) dispatch(set_deleted_user(deletedUser));

    userCtx.onDeleteUser(id);

    dispatch(set_show_undo_screen(true));
  };

  const undoDeletedUser = () => {
    userCtx.undoDeletedUser(state.deletedIndex, state.deletedUser);
    dispatch(set_show_undo_screen(false));
  };

  return {
    undoDeletedUser,
    state,
    onSaveUser,
    onDeleteUser,
    handleShowModal,
  };
};
