import { useEffect, useReducer } from "react";
import { usersStore } from "../../st-management/mobx";
import { userType } from "../../types";
import { IInit } from "./useCtxUserList";

export const useMobXUserList = () => {
  const initialState: IInit = {
    deletedIndex: 0,
    showModal: false,
    showUndoScreen: false,
    showFilterModal: false,
    deletedUser: {
      id: "",
      email: "",
      gender: "",
      mobile: "",
      address: "",
      fullName: "",
    },
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

  const set_show_filter_modal = (value: boolean) => ({
    type: "SHOW_FILTER_MODAL",
    payload: value,
  });

  const reducer = (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ) => {
    switch (type) {
      case "SHOW_FILTER_MODAL":
        return { ...state, showFilterModal: payload as boolean };
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
    // fetching users list
    usersStore.onFetchUsersList();
  }, []);

  useEffect(() => {
    if (state.showUndoScreen) {
      setTimeout(() => {
        dispatch(set_show_undo_screen(false));
        onClearDeletedUser();
      }, 2000);
    }
  }, [state.showUndoScreen]);

  const onClearDeletedUser = () => {
    // clear info
    dispatch(
      set_deleted_user({
        id: "",
        email: "",
        mobile: "",
        gender: "",
        address: "",
        fullName: "",
      })
    );
  };

  const handleShowModal = (value: boolean): void => {
    dispatch(set_show_modal(value));
    onClearDeletedUser();
  };

  // save user
  const onSaveUser = (value: userType) => {
    if (usersStore.copiedUsers.length === 0) {
      usersStore.onAddingUser(value);
    } else {
      // check user existed or not?
      let existed = usersStore.copiedUsers.find((el) => el.id === value.id);

      // not existed, so add info
      if (existed === undefined) {
        usersStore.onAddingUser(value);
      } else {
        // deleting existed user
        usersStore.onEditingUser(value);
        onClearDeletedUser();
      }
    }
  };

  // deleting user
  const onDeleteUser = (id: string) => {
    // deleted index
    dispatch(
      set_deleted_index(usersStore.copiedUsers.findIndex((el) => el.id === id))
    );

    // deleted user
    let deletedUser = usersStore.copiedUsers.find((el) => el.id === id);
    if (deletedUser !== undefined) dispatch(set_deleted_user(deletedUser));

    // deleting user
    usersStore.onDeletingUser(id);

    dispatch(set_show_undo_screen(true));
  };

  // undo deleting user
  const undoDeletedUser = () => {
    usersStore.onUndoDeletingUser(state.deletedIndex, state.deletedUser);
    dispatch(set_show_undo_screen(false));
  };

  // editing user info
  const handleEditItem = (value: userType) => {
    dispatch(set_show_modal(true));
    dispatch(set_deleted_user(value));
  };

  // show, hide modal
  const handleFilterModal = (value: boolean) => {
    dispatch(set_show_filter_modal(value));
  };

  // show, hide modal
  const handleApplyFilter = (type: string) => {
    usersStore.onFilteringUsers(type);
  };

  return {
    handleEditItem,
    handleFilterModal,
    handleApplyFilter,
    undoDeletedUser,
    state,
    onSaveUser,
    onDeleteUser,
    handleShowModal,
  };
};
