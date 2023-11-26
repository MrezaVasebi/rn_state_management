import React from "react";
import { useRecoilValue } from "recoil";
import { MainScreen } from "../components";
import { filteredUsers } from "../st-management/recoil";
import { useRecoilUserList } from "./logic";

const RecoilUserList = () => {
  const hooks = useRecoilUserList();

  // if you want to read and write state in atom use useRecoilState hooks
  // if you want to only read state in atom use useRecoilState

  // const users = useRecoilValue(usersState); // users -> []
  // const usersSize = useRecoilValue(usersCount); // usersSize -> 0

  // const [users, setUsers] = useRecoilState(usersList);

  let users = useRecoilValue(filteredUsers);

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

export default RecoilUserList;
