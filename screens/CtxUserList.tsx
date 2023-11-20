import React, { useContext } from "react";
import {
  AddUser,
  FilteredItems,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { UserContext } from "../st-management/context-api";
import { UserContextType, userType } from "../types";
import { useCtxUserList } from "./logic";
import { FilterModal, FormModal } from "./modal";

const CtxUserList = () => {
  const hooks = useCtxUserList();
  const userCtx = useContext(UserContext) as UserContextType;

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {userCtx.copiedUsers.length !== 0 && (
        <FilteredItems
          count={userCtx.copiedUsers.length}
          onPressFilter={() => hooks.handleFilterModal(true)}
        />
      )}

      {userCtx.copiedUsers.length === 0 ? (
        <NoData />
      ) : (
        <UsersList
          data={userCtx.copiedUsers}
          onDeleteUser={hooks.onDeleteUser}
          onEditUser={(value: userType) => hooks.handleEditItem(value)}
        />
      )}

      {hooks.state.showModal && (
        <FormModal
          editedUser={hooks.state.deletedUser}
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.onSaveUser(value)}
        />
      )}

      {hooks.state.showUndoScreen && (
        <UndoView onPress={hooks.undoDeletedUser} />
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

export default CtxUserList;
