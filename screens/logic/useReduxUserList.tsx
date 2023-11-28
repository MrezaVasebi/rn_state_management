import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  onDeleteUser,
  onEditUser,
  onFilterUser,
  onSaveUser,
  undoDeletedUser,
} from "../../st-management/redux-toolkit";
import { userType } from "../../types";

interface IInit {
  showModal: boolean;
  deletedIndex: number;
  deletedUser: userType;
  showUndoScreen: boolean;
  showFilterModal: boolean;
}

export const useReduxUserList = () => {
  const userDispatch = useDispatch<AppDispatch>();
  let { users } = useSelector((state: RootState) => state.userReducer);

  const initialState: IInit = {
    deletedIndex: 0,
    showModal: false,
    showUndoScreen: false,
    showFilterModal: false,
    deletedUser: {
      id: "",
      email: "",
      mobile: "",
      gender: "",
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

  const handleSavingUser = (value: userType) => {
    if (users.length === 0) {
      userDispatch(onSaveUser({ value: value }));
    } else {
      // check user existed or not?
      let existed = users.find((el) => el.id === value.id);

      // user not existed, so add it
      if (existed === undefined) {
        userDispatch(onSaveUser({ value: value }));
      } else {
        userDispatch(onEditUser({ value: value }));
        onClearDeletedUser();
      }
    }
  };

  // deleting user
  const handleDeletingUser = (id: string) => {
    // deleted index
    dispatch(set_deleted_index(users.findIndex((el) => el.id === id)));

    // deleted user
    let deletedUser = users.find((el) => el.id === id);
    if (deletedUser !== undefined) dispatch(set_deleted_user(deletedUser));

    userDispatch(onDeleteUser({ id: id }));

    dispatch(set_show_undo_screen(true));
  };

  // undo deleting user
  const handleUndoDeletingUser = () => {
    userDispatch(
      undoDeletedUser({ index: state.deletedIndex, value: state.deletedUser })
    );
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
  const handleApplyFilter = (value: string) => {
    userDispatch(onFilterUser({ type: value }));
  };

  return {
    handleApplyFilter,
    handleFilterModal,
    handleEditItem,
    handleUndoDeletingUser,
    state,
    handleSavingUser,
    handleDeletingUser,
    handleShowModal,
  };
};
