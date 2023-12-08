import React, { useContext } from "react";
import { MainScreen } from "../components";
import { UserContext } from "../st-management/context-api";
import { UserContextType } from "../types";
import { useCtxUserList } from "./logic";

const CtxUserList = () => {
  const hooks = useCtxUserList();
  const userCtx = useContext(UserContext) as UserContextType;

  return (
    <MainScreen
      state={hooks.state}
      todoList={userCtx.todoList}
      users={userCtx.copiedUsers}
      loading={hooks.state.loading}
      onSaveUser={hooks.onSaveUser}
      onDeleteUser={hooks.onDeleteUser}
      handleEditItem={hooks.handleEditItem}
      handleShowModal={hooks.handleShowModal}
      undoDeletedUser={hooks.undoDeletedUser}
      handleFilterModal={hooks.handleFilterModal}
      handleApplyFilter={hooks.handleApplyFilter}
    />
  );
};

export default CtxUserList;
