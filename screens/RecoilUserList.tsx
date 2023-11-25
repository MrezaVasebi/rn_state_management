import React from "react";
import { useRecoilValue } from "recoil";
import {
  AddUser,
  FilteredItems,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { filteredUsers } from "../st-management/recoil";
import { userType } from "../types";
import { useRecoilUserList } from "./logic";
import { FilterModal, FormModal } from "./modal";

const RecoilUserList = () => {
  const hooks = useRecoilUserList();

  // if you want to read and write state in atom use useRecoilState hooks
  // if you want to only read state in atom use useRecoilState

  // const users = useRecoilValue(usersState); // users -> []
  // const usersSize = useRecoilValue(usersCount); // usersSize -> 0

  // const [users, setUsers] = useRecoilState(usersList);

  let users = useRecoilValue(filteredUsers);

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {users.length !== 0 && (
        <FilteredItems
          count={users.length}
          onPressFilter={() => hooks.handleFilterModal(true)}
        />
      )}

      {users.length === 0 ? (
        <NoData />
      ) : (
        <UsersList
          data={users}
          onDeleteUser={(id: string) => hooks.handleDeletingUser(id)}
          onEditUser={(value: userType) => hooks.handleEditItem(value)}
        />
      )}

      {hooks.state.showModal && (
        <FormModal
          editedUser={hooks.state.deletedUser}
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.handleSavingUser(value)}
        />
      )}

      {hooks.state.showUndoScreen && (
        <UndoView onPress={hooks.handleUndoDeletingUser} />
      )}

      {hooks.state.showFilterModal && (
        <FilterModal
          onPressClose={() => hooks.handleFilterModal(false)}
          onSelectFilter={(value: string) => hooks.handleApplyFilter(value)}
        />
      )}
    </RootScreen>
  );
};

export default RecoilUserList;

