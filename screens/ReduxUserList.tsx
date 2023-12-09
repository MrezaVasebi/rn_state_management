import React from "react";
import { useSelector } from "react-redux";
import { MainScreen } from "../components";
import { RootState } from "../st-management/redux-toolkit";
import { useReduxUserList } from "./logic";

const ReduxUserList = () => {
  const hooks = useReduxUserList();
  let { copiedUsers, loading, usersList } = useSelector(
    (state: RootState) => state.userReducer
  );

  return (
    <MainScreen
      loading={loading} // loading
      users={copiedUsers} // local
      state={hooks.state}
      usersList={usersList} // api
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

export default ReduxUserList;
