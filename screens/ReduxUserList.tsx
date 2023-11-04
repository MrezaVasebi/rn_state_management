import React from "react";
import { useSelector } from "react-redux";
import {
  AddUser,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { RootState } from "../st-management/redux-toolkit";
import { userType } from "../types";
import { useReduxUserList } from "./logic";
import { FormModal } from "./modal";

const UserList = () => {
  const hooks = useReduxUserList();
  let { users } = useSelector((state: RootState) => state.userReducer);

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {users.length === 0 ? (
        <NoData />
      ) : (
        <UsersList data={users} onDeleteUser={hooks.handleDeletingUser} />
      )}

      {hooks.state.showModal && (
        <FormModal
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.handleSavingUser(value)}
        />
      )}

      {hooks.state.showUndoScreen && (
        <UndoView onPress={hooks.handleUndoDeletingUser} />
      )}
    </RootScreen>
  );
};

export default UserList;
