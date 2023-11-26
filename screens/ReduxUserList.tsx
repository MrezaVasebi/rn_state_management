import React from "react";
import { useSelector } from "react-redux";
import { MainScreen } from "../components";
import { RootState } from "../st-management/redux-toolkit";
import { useReduxUserList } from "./logic";

const UserList = () => {
  const hooks = useReduxUserList();
  let { copiedUsers: users } = useSelector(
    (state: RootState) => state.userReducer
  );

  return (
    <MainScreen
      data={users}
      state={hooks.state}
      onSaveUser={hooks.handleSavingUser}
      handleEditItem={hooks.handleEditItem}
      onDeleteUser={hooks.handleDeletingUser}
      handleShowModal={hooks.handleShowModal}
      handleFilterModal={hooks.handleFilterModal}
      handleApplyFilter={hooks.handleApplyFilter}
      undoDeletedUser={hooks.handleUndoDeletingUser}
    />
  );
};

export default UserList;
