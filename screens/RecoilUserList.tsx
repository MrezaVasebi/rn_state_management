import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  AddUser,
  AppText,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { usersCount, usersState } from "../st-management/recoil";
import { userType } from "../types";
import { useRecoilUserList } from "./logic";
import { FormModal } from "./modal";

const RecoilUserList = () => {
  const hooks = useRecoilUserList();

  // if you want only get the value of the recoil state -> useRecoilValue()
  const users = useRecoilValue(usersState); // users -> []
  const usersSize = useRecoilValue(usersCount); // usersSize -> 0

  // if you want to get and set the value to recoil state -> useRecoilState
  // const [users, setUsers] = useRecoilState(usersList);

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {users.length !== 0 && (
        <View style={styles.countStyle}>
          <AppText label={`User count: ${usersSize.toString()}`} />
        </View>
      )}

      {users.length === 0 ? (
        <NoData />
      ) : (
        <UsersList
          data={users}
          onEditUser={(value: userType) => hooks.handleEditItem(value)}
          onDeleteUser={(id: string) => hooks.handleDeletingUser(id)}
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
    </RootScreen>
  );
};

export default RecoilUserList;
const styles = StyleSheet.create({
  countStyle: {
    opacity: 0.7,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
