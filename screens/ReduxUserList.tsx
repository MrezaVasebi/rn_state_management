import React from "react";
import { useSelector } from "react-redux";
import {
  AddUser,
  FilteredItems,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { RootState } from "../st-management/redux-toolkit";
import { userType } from "../types";
import { useReduxUserList } from "./logic";
import { FilterModal, FormModal } from "./modal";

const UserList = () => {
  const hooks = useReduxUserList();
  let { copiedUsers: users } = useSelector(
    (state: RootState) => state.userReducer
  );

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
          onDeleteUser={hooks.handleDeletingUser}
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

export default UserList;
