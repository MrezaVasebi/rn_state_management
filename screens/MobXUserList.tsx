import { observer } from "mobx-react";
import React from "react";
import { MainScreen } from "../components";
import { usersStore } from "../st-management/mobx";
import { useMobXUserList } from "./logic";

const MobXUserList = observer(() => {
  const hooks = useMobXUserList();

  return (
    <MainScreen
      state={hooks.state}
      onSaveUser={hooks.onSaveUser}
      data={usersStore.copiedUsers}
      onDeleteUser={hooks.onDeleteUser}
      handleEditItem={hooks.handleEditItem}
      handleShowModal={hooks.handleShowModal}
      undoDeletedUser={hooks.undoDeletedUser}
      handleFilterModal={hooks.handleFilterModal}
      handleApplyFilter={hooks.handleApplyFilter}
    />
  );
});

export default MobXUserList;
