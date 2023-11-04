import React, { useContext } from "react";
import {
  AddUser,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { UserContext } from "../st-management/context-api";
import { UserContextType, userType } from "../types";
import { useUserList } from "./logic";
import { FormModal } from "./modal";

const UserList = () => {
  const hooks = useUserList();
  const userCtx = useContext(UserContext) as UserContextType;

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {userCtx.users.length === 0 ? (
        <NoData />
      ) : (
        <UsersList data={userCtx.users} onDeleteUser={hooks.onDeleteUser} />
      )}

      {hooks.state.showModal && (
        <FormModal
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.onSaveUser(value)}
        />
      )}

      {hooks.state.showUndoScreen && (
        <UndoView onPress={hooks.undoDeletedUser} />
      )}
    </RootScreen>
  );
};

export default UserList;
