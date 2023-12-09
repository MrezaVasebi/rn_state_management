import React from "react";
import { useRecoilValue } from "recoil";
import { MainScreen } from "../components";
import { filteredUsers } from "../st-management/recoil";
import { useRecoilUserList } from "./logic";

const RecoilUserList = () => {
  const hooks = useRecoilUserList();
  const users = useRecoilValue(filteredUsers); // local

  // if you want to read and write state in atom use useRecoilState hooks
  // if you want to only read state in atom use useRecoilValue

  /* only for reading atom
  const users = useRecoilValue(usersState); // users -> []
   const usersSize = useRecoilValue(usersCount); // usersSize -> 0
  */

  /* for reading and writing atom
  // const [users, setUsers] = useRecoilState(usersList);
  */

  return (
    <MainScreen
      users={users} // local
      state={hooks.state}
      loading={hooks.loading} // api
      usersList={hooks.usersList} // api
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
